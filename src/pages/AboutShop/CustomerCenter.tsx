import QuestionItem from "../../components/about-shop/QuestionItem";

const questions = [
  {
    id: 1,
    question: "I just placed an order when will I receive it?",
    answer:
      "If you placed an order before 6:00pm on any business day it will be shipped on the same day and you will receive it the next business day. Orders placed from Friday 6:00PM to Sunday 16:00 will be shipped on Sunday and will be delivered on Monday. *Orders placed on public holidays will be shipped the next business day.",
  },
  {
    id: 2,
    question: "I just placed an order, can I cancel it?",
    answer:
      "If your order has not been shipped you can cancel it by contacting Groceteria customer support center. However, if your order is shipped or delivered, you cannot cancel it. *If your order is cancelled your money will be refunded back to your credit / check card in 1~3 business days.",
  },
  {
    id: 3,
    question: "If I order on Friday, when will I receive it?",
    answer:
      "If you placed an order before 6:00pm on Friday, it will be shipped  on the same day. And you will receive it on Saturday. However, if you place an order after 6:00pm, it will be shipped on Sunday and you will receive it on the next business day.",
  },
  {
    id: 4,
    question:
      "Should I call and inform you when I transfer money to virtual account number?",
    answer:
      "Absolutely no. You do not have to call and inform us. Once you transfer money via Stripe or Paypal, Groceteria will automatically process the order.",
  },
  {
    id: 5,
    question: "Where can I find order history and details?",
    answer:
      "You can see all of your previous orders and their details in your 'Dashboard' page. Also you can find the list of all your previous  deposits in that page.",
  },
  {
    id: 6,
    question: "Are the products all Halal?",
    answer:
      "Yes, absolutely. All of the products in Groceteria are Halal. Groceteria team checks ingredients of every product one by one.",
  },
];

const CustomerCenter = () => {
  return (
    <div className="section-md">
      <div className="container">
        <div className="customer-center">
          <div
            className="section__head"
            style={{ justifyContent: "left", marginBottom: "2rem" }}
          >
            <h1>Frequently asked questions:</h1>
          </div>
          <div className="questions-box">
            {questions.map((item) => (
              <QuestionItem key={item.id} {...item} />
            ))}
          </div>
          <div className="more-info">
            <p>
              Customer service center answers calls from 8:00AM to 8:00PM every
              day of the week.
            </p>
            <p>*Saturdays, Sundays and public days, we are closed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCenter;
