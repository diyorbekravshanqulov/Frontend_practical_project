<template>
  <div class="calendar max-w-xs mx-auto mt-6">
    <div class="calendar-header flex justify-between items-center bg-gray-200 px-4 py-2">
      <button @click="prevMonth" class="text-gray-700">&lsaquo;</button>
      <div>{{ months[currentMonth] }} {{ currentYear }}</div>
      <button @click="nextMonth" class="text-gray-700">&rsaquo;</button>
    </div>
    <div class="calendar-body grid grid-cols-7 gap-1 bg-white">
      <div v-for="day in daysOfWeek" :key="day" class="calendar-day text-center text-sm text-gray-700 bg-gray-100 p-2">
        {{ day }}
      </div>
      <div
        v-for="date in calendarDays"
        :key="date.date.getTime()"
        @click="selectDate(date)"
        :class="{
          'cursor-pointer': date.isCurrentMonth,
          'text-gray-400': !date.isCurrentMonth,
          'bg-yellow-300': date.isToday && date.isCurrentMonth,
          'bg-gray-200': !date.isCurrentMonth
        }"
        class="calendar-date flex justify-center items-center text-center text-sm p-2"
      >
        {{ date.day }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const daysInWeek = 7;
const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthLabels = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getDayOfWeek = (year, month, day) => {
  return new Date(year, month, day).getDay();
};

const generateCalendarDays = (year, month) => {
  const daysInCurrentMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getDayOfWeek(year, month, 1);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  let days = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isToday: false,
      isCurrentMonth: false,
      date: new Date(prevYear, prevMonth, daysInPrevMonth - i)
    });
  }

  for (let i = 1; i <= daysInCurrentMonth; i++) {
    days.push({
      day: i,
      isToday: new Date().toDateString() === new Date(year, month, i).toDateString(),
      isCurrentMonth: true,
      date: new Date(year, month, i)
    });
  }

  const remainingDays = daysInWeek - (days.length % daysInWeek);
  if (remainingDays < daysInWeek) {
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isToday: false,
        isCurrentMonth: false,
        date: new Date(nextYear, nextMonth, i)
      });
    }
  }

  return days;
};

const state = reactive({
  currentYear: ref(new Date().getFullYear()),
  currentMonth: ref(new Date().getMonth())
});

const calendarDays = computed(() => {
  return generateCalendarDays(state.currentYear.value, state.currentMonth.value);
});

const prevMonth = () => {
  if (state.currentMonth.value === 0) {
    state.currentYear.value--;
    state.currentMonth.value = 11;
  } else {
    state.currentMonth.value--;
  }
};

const nextMonth = () => {
  if (state.currentMonth.value === 11) {
    state.currentYear.value++;
    state.currentMonth.value = 0;
  } else {
    state.currentMonth.value++;
  }
};

const selectDate = (date) => {
  if (date.isCurrentMonth) {
    console.log('Selected Date:', date.date.toDateString());
    // Handle your logic here for selecting a date
  }
};

const daysOfWeek = dayLabels;
const months = monthLabels;

</script>

<style scoped>
.calendar {
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar-day, .calendar-date {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}

.calendar-date {
  cursor: pointer;
}
</style>
