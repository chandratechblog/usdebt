/*
See on github: https://github.com/muhammederdem/credit-card-form
*/

new Vue({
  el: "#app",
  data() {
    return {
      currentCardBackground: Math.floor(Math.random()* 25 + 1), // just for fun :D
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false
    };
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();
  },
  computed: {
    getCardType () {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";
      
      re = new RegExp('^9792')
      if (number.match(re) != null) return 'troy'

      return "visa"; // default type
    },
		generateCardNumberMask () {
			return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth () {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear () {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },
  methods: {
    flipCard (status) {
      this.isCardFlipped = status;
    },
    focusInput (e) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      }
    },
    blurInput() {
      let vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    }
  }
});



// submit text
function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Function to get the current date in the format: YYYY-MM-DD
function getCurrentDate() {
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const today = new Date();
  console.log(today)
  const date = String(today.getDate()).padStart(2, '0');
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();

  return `${date} ${month}, ${year} ${hour}:${min}:${sec}`;
}


function makePayment() {
  // You can perform any additional validation here if needed.
  // For this demonstration, we'll just show the "Thank You" message after a short delay.
  setTimeout(function () {
    showThankYouMessage();
  }, 2000);

  // Simulating a payment delay of 2 seconds.
  var refNum = document.getElementById("order-number");
  var date = document.getElementById("date");
  // Update the content of the div
  referanceNum = generateRandomNumber()
  currntDate = getCurrentDate()
  console.log(referanceNum)
  console.log(currntDate)
  refNum.innerHTML = referanceNum;
  date.innerHTML = currntDate;
}


function showThankYouMessage() {
  const paymentForm = document.querySelector('.card-form__inner ');
  // const thankYouMessage = document.getElementById('thank-you-message');
  const cardList = document.querySelector('.card-list ');
  paymentForm.style.display = 'none';
  cardList.style.display = 'none';
  $('#thank-you-message').attr('class','card-item');
  // thankYouMessage.style.display = '';
}
