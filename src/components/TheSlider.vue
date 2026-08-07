<template>
    <slot name="review" :item="reviews[currentIndex]">
        
    </slot>
    <div class="buttons">
      <button @click="prevSlide">
        &gt;
      </button>
      <button @click="nextSlide">
        &lt;
      </button>
    </div>        
</template>

<script setup>
import { ref } from 'vue';

const currentIndex = ref(0);
const reviews = [
  {
    id: 1,
    name: "Alex Stanton",
    position: "CEO at Bukalapak",
    date: "21 July 2022",
    rating: 4,
    text: "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite."
  },
  {
    id: 2,
    name: "Skylar Dias",
    position: "CEO at Amazon",
    date: "20 July 2022",
    rating: 4,
    text: "We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite."
  },
  {
    id: 3,
    name: "Emily Carter",
    position: "Product Manager at Google",
    date: "18 July 2022",
    rating: 5,
    text: "Excellent experience from start to finish. The booking process was simple, the vehicle was clean, and customer support answered all of my questions."
  },
  {
    id: 4,
    name: "Daniel Moore",
    position: "Software Engineer at Microsoft",
    date: "17 July 2022",
    rating: 5,
    text: "I've rented cars several times through MORENT and every experience has been smooth. Great prices, reliable vehicles, and professional service."
  },
  {
    id: 5,
    name: "Sophia Wilson",
    position: "Designer at Adobe",
    date: "15 July 2022",
    rating: 4,
    text: "The car was exactly as described and in excellent condition. I especially appreciated the quick pickup and return process."
  },
  {
    id: 6,
    name: "Michael Brown",
    position: "Marketing Lead at Spotify",
    date: "14 July 2022",
    rating: 5,
    text: "Friendly staff, transparent pricing, and a fantastic selection of vehicles. I'll definitely use MORENT again."
  },
  {
    id: 7,
    name: "Olivia Taylor",
    position: "HR Manager at Netflix",
    date: "13 July 2022",
    rating: 5,
    text: "Renting a car has never been this easy. Everything worked perfectly and the support team was always available."
  },
  {
    id: 8,
    name: "James Anderson",
    position: "Business Analyst at IBM",
    date: "12 July 2022",
    rating: 4,
    text: "Very satisfied with the service. The booking was quick, and the vehicle exceeded my expectations."
  },
  {
    id: 9,
    name: "Charlotte White",
    position: "Project Manager at Tesla",
    date: "11 July 2022",
    rating: 5,
    text: "Outstanding customer experience. The staff was professional and the car was in perfect condition."
  },
  {
    id: 10,
    name: "Benjamin Harris",
    position: "Consultant at Deloitte",
    date: "10 July 2022",
    rating: 4,
    text: "Great value for money. The whole rental process was simple, transparent, and stress-free."
  },
  {
    id: 11,
    name: "Ava Martinez",
    position: "UI Designer at Airbnb",
    date: "9 July 2022",
    rating: 5,
    text: "I loved the quality of the vehicle and how easy it was to complete the reservation online. Highly recommended."
  },
  {
    id: 12,
    name: "William Clark",
    position: "Financial Advisor at PayPal",
    date: "8 July 2022",
    rating: 4,
    text: "Everything was handled professionally. The pricing was fair, and the vehicle was clean and comfortable."
  },
  {
    id: 13,
    name: "Mia Thompson",
    position: "Operations Manager at Uber",
    date: "7 July 2022",
    rating: 5,
    text: "Fantastic service with a wide range of vehicles. I'll definitely recommend MORENT to my colleagues and friends."
  }
];
reviews.forEach(review => {
  review.avatar = `https://i.pravatar.cc/150?img=${review.id}`
})
const nextSlide = () => {
    if(currentIndex.value === reviews.length - 1) {
        currentIndex.value = 0
    } else {
        currentIndex.value++;
    }
}
const prevSlide = () => {
    if(currentIndex.value === 0) {
        currentIndex.value = reviews.length -1
    } else {
        currentIndex.value--;
    }
}
</script>

<style>

</style>