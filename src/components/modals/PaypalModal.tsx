import ReactDOM from "react-dom";
import { useEffect } from "react";
import { loadScript } from "@paypal/paypal-js";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const PaypalOverlay = ({
  closeModal,
  orderData,
}: {
  closeModal: () => void;
  orderData: any;
}) => {
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let paypal: any;

    const getPaypalButtons = async () => {
      try {
        const { data } = await axiosPrivate(`orders/paypal-client-id`);
        paypal = await loadScript({ clientId: data.clientId });
      } catch (error) {
        console.error("failed to load the PayPal JS SDK script", error);
      }

      if (paypal) {
        try {
          await paypal
            .Buttons({
              createOrder: async () => {
                try {
                  const { data } = await axiosPrivate.post(
                    "orders/paypal/create-order",
                    orderData
                  );

                  if (data.id) {
                    return data.id;
                  } else {
                    const errorDetail = data?.details?.[0];
                    const errorMessage = errorDetail
                      ? `${errorDetail.issue} ${errorDetail.description} (${data.debug_id})`
                      : JSON.stringify(data);

                    throw new Error(errorMessage);
                  }
                } catch (error) {
                  console.error(error);
                }
              },
              onApprove: async (
                data: { orderID: string },
                actions: { restart: () => void }
              ) => {
                console.log("orderID:", data.orderID);
                try {
                  const response = await axiosPrivate.patch(
                    `orders/${data.orderID}/paypal/capture`
                  );

                  // const orderData = await response.json();
                  // Three cases to handle:
                  //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  //   (2) Other non-recoverable errors -> Show a failure message
                  //   (3) Successful transaction -> Show confirmation or thank you message

                  const errorDetail = response.data?.details?.[0];

                  if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                    console.log("Hellow");
                    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                    return actions.restart();
                  } else if (errorDetail) {
                    // (2) Other non-recoverable errors -> Show a failure message
                    throw new Error(
                      `${errorDetail.description} (${response.data.debug_id})`
                    );
                  } else if (!response.data.purchase_units) {
                    throw new Error(JSON.stringify(response.data));
                  } else {
                    // (3) Successful transaction -> Show confirmation or thank you message
                    // Or go to another URL:  actions.redirect('thank_you.html');
                    const transaction =
                      response.data?.purchase_units?.[0]?.payments
                        ?.captures?.[0] ||
                      response.data?.purchase_units?.[0]?.payments
                        ?.authorizations?.[0];
                    console.log("transaction:", transaction);

                    window.location.href =
                      "https://groceteria-client.vercel.app/orders";

                    console.log(
                      "Capture result",
                      response.data,
                      JSON.stringify(response.data, null, 2)
                    );
                  }
                } catch (error) {
                  console.error(error);
                }
              },
              onCancel: async function (data: any) {
                console.log("data:", data);

                try {
                  await axiosPrivate.patch(`orders/${data.orderID}/cancel`);
                  window.location.href =
                    "https://groceteria-client.vercel.app/checkout";
                } catch (error) {
                  console.log(error);
                }
              },
              style: {
                layout: "horizontal",
                size: "large",
                label: "paypal",
                height: 40,
                tagline: false,
                shape: "rect",
              },
            })
            .render("#paypal-modal__buttons");
        } catch (error) {
          console.error("failed to render the PayPal Buttons", error);
        }
      }
    };

    getPaypalButtons();
  }, [axiosPrivate, orderData]);
  return (
    <div className="paypal-modal">
      <h1>Pay with Paypal safely and easily</h1>
      <div id="paypal-modal__buttons"></div>
    </div>
  );
};

const PaypalModal = ({ closeModal, orderData }: PaypalModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <PaypalOverlay closeModal={closeModal} orderData={orderData} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

interface PaypalModalProps {
  closeModal: () => void;
  orderData: any;
}

export default PaypalModal;
