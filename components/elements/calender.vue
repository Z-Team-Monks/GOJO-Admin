<template>
    <div id="app">
  
    <main class="b-calendar">
          <div class="b-calendar__calendar">
            <div class="b-calendar__header">
              <div class="row">
                <div class="col year text-center" v-bind:class="{ 'align-self-end': true }">
                  <span>{{year}}  {{selectedDayAndMonth.month | capitalize}},  {{selectedDayAndMonth.day}}</span>
                </div>
              </div>
              <div class="row align-items-center">
                <div class="col text-center" v-bind:class="{ 'align-self-start': true }">
                  <button id="subtractMonthBtn" class="arrow arrow-left" v-bind:class="{ 'btn-light': true }" @click="subtractMonth">
                    <i class="mdi mdi-chevron-left"></i>
                  </button>
                  <!-- <div class="b-tooltip" v-bind:data-target="'subtractMonthBtn'">
                    {{previousMonthAsString | capitalize}}
                  </div> -->
                </div>
                <div class="col text-center" v-bind:class="{ 'align-self-center': true }">
                  <span class="month">{{month}}</span>
                </div>
                <div class="col text-right" v-bind:class="{ 'd-flex': true, 'flex-row-reverse': true, 'align-self-end': true }">
                  <button id="addMonthBtn" class="arrow arrow-right" v-bind:class="{ 'btn-light': true }" @click="addMonth">
                    <i class="mdi mdi-chevron-right"></i>
                  </button>
                  <!-- <div class="b-tooltip" v-bind:data-target="'addMonthBtn'">
                    {{nextMonthAsString | capitalize}}
                  </div> -->
                </div>
              </div>
            </div>
            <div class="b-calendar__weekdays">
              <div class="weekday text-center" v-for="(day, index) in days" :key="index">
                <strong>{{day}}</strong>
              </div>
            </div>
            <div class="b-calendar__dates">
              <div class="date text-center" v-for="date in dateList" :key="date.key" v-bind:class="{'today': date.today, 'blank': date.blank, 'no-border-right': date.key % 7 === 0 }" v-bind:data-date="date.date" @click="setSelectedDate(date.moment)">
                <span class="day">{{date.dayNumber}}</span>
                <span class="weekday">{{date.weekDay}}</span>
                <!-- <div class="additional" v-show="date.additional">
                  <span class="year" v-show="date.additional.year">{{date.additional.year}}</span>
                  <span class="month" v-show="date.additional.month">{{date.additional.month}}</span>
            </div> -->
          </div>
        </div>
      </div>
   
  
</main>

</div>
</template>

<script>
import moment from 'moment';

export default {
    name:'calender',

    data() {
        return {
            today: moment(),
        dateContext: moment(),
        selectedDate: moment(),
        days: ["M", "T", "W", "T", "F", "S", "S"],
        selected: false,
        }
    },
    computed: {
        year: function() {
            return this.dateContext.format("Y");
        },

        month: function() {
            return this.dateContext.format("MMMM");
        },

        daysInMonth: function() {
            return this.dateContext.daysInMonth();
        },

        currentDate: function() {
            return this.dateContext.get("date");
        },

        firstDayOfMonth: function() {
            let firstDay = moment(this.dateContext).subtract(this.currentDate,"days");
            return firstDay.weekday();
        },

        previousMonth: function() {
            return moment(this.dateContext).subtract(1, "month");
        },
        previousMonthAsString: function() {
            return this.previousMonth.format("MMMM");
        },
        nextMonth: function() {
            return moment(this.dateContext).add(1, "month");
        },
        nextMonthAsString: function() {
            return this.nextMonth.format("MMMM");
        },

        daysInPreviousMonth: function() {
            return this.previousMonth.daysInMonth();
        },
        daysFromPreviousMonth: function() {
            let daysList = [];
            let count = this.daysInPreviousMonth - this.firstDayOfMonth;
            while (count < this.daysInPreviousMonth) {
                count++;
                daysList[count] = count;
            }

            return daysList.filter(function() {
                return true;
            });
        },

        dateList: function() {
            let $this = this;

            let dateList = [];

            let previousMonth = this.previousMonth;
            let nextMonth = this.nextMonth;

            //dates for display
            let formattedCurrentMonth = this.dateContext.format("MM");
            let formattedCurrentYear = this.year;
            let formattedPreviousMonth = previousMonth.format("MM");
            let formattedPreviousYear = previousMonth.format("Y");
            let formattedNextMonth = nextMonth.format("MM");
            let formattedNextYear = nextMonth.format("Y");

            //counters
            let countDayInCurrentMonth = 0;
            let countDayInPreviousMonth = 0;

            //filling in dates from the previous month
            this.daysFromPreviousMonth.forEach(function(dayFromPreviousMonth) {
                countDayInCurrentMonth++;
                countDayInPreviousMonth++;

                let formattedDay = $this.formattingDay(dayFromPreviousMonth);
                let previousMonth =
                    $this.daysFromPreviousMonth.length ===
                    countDayInPreviousMonth
                        ? $this.previousMonthAsString
                        : false;
                let previousYear =
                    formattedCurrentYear !== formattedPreviousYear &&
                    $this.daysFromPreviousMonth.length ===
                        countDayInPreviousMonth
                        ? formattedPreviousYear
                        : false;
                let additional = {
                    month: previousMonth,
                    year: previousYear
                };

                if (!previousMonth && !previousYear) {
                    additional = false;
                }

                dateList[countDayInCurrentMonth] = {
                    key: countDayInCurrentMonth,
                    dayNumber: formattedDay,
                    date:
                        formattedDay +
                        "." +
                        formattedPreviousMonth +
                        "." +
                        formattedPreviousYear,
                    blank: true,
                    today: false,
                    additional: additional,
                    weekDay: false,
                    moment: moment(
                        formattedPreviousYear +
                            formattedPreviousMonth +
                            formattedDay
                    )
                };
            });

            //filling in dates from the current month
            while (countDayInCurrentMonth < this.firstDayOfMonth + this.daysInMonth) {
                countDayInCurrentMonth++;

                let day = countDayInCurrentMonth - countDayInPreviousMonth;
                let weekDay = this.getWeekDay(countDayInCurrentMonth);
                let formattedDay = this.formattingDay(day);

                dateList[countDayInCurrentMonth] = {
                    key: countDayInCurrentMonth,
                    dayNumber: formattedDay,
                    date:
                        formattedDay +
                        "." +
                        formattedCurrentMonth +
                        "." +
                        formattedCurrentYear,
                    blank: false,
                    today:
                        formattedDay === this.initialDate &&
                        this.todayInCurrentMonthAndYear,
                    additional: false,
                    weekDay: weekDay,
                    moment: moment(
                        formattedCurrentYear +
                            formattedCurrentMonth +
                            formattedDay
                    )
                };
            }

            let daysInNextMonth = 7 - (countDayInCurrentMonth % 7);
            let countDayInCurrentMonthSaved = countDayInCurrentMonth;
            let day = 0;

            //filling in dates from the next month
            if (daysInNextMonth < 7) {
                while (
                    countDayInCurrentMonth <
                    countDayInCurrentMonthSaved + daysInNextMonth
                ) {
                    countDayInCurrentMonth++;
                    day++;

                    let formattedDay = this.formattingDay(day);
                    let nextMonth = day === 1 ? this.nextMonthAsString : false;
                    let nextYear =
                        formattedCurrentYear !== formattedNextYear && day === 1
                            ? formattedNextYear
                            : false;
                    let additional = {
                        month: nextMonth,
                        year: nextYear
                    };

                    if (!nextMonth && !nextYear) {
                        additional = false;
                    }

                    dateList[countDayInCurrentMonth] = {
                        key: countDayInCurrentMonth,
                        dayNumber: formattedDay,
                        date:
                            formattedDay +
                            "." +
                            formattedNextMonth +
                            "." +
                            formattedNextYear,
                        blank: true,
                        today: false,
                        additional: additional,
                        weekDay: false,
                        moment: moment(
                            formattedNextYear +
                                formattedNextMonth +
                                formattedDay
                        )
                    };
                }
            }

            return dateList.filter(function() {
                return true;
            });
        },

        initialDate: function() {
            return this.formattingDay(this.today.get("date"));
        },
        initialMonth: function() {
            return this.today.format("MMMM");
        },
        initialYear: function() {
            return this.today.format("Y");
        },
        todayInCurrentMonthAndYear: function() {
            return (
                this.month === this.initialMonth &&
                this.year === this.initialYear
            );
        },
        selectedDayAndMonth: function() {
            let dayAndMonth = this.selectedDate.format("D MMMM");
            dayAndMonth = dayAndMonth.split(" ");
            dayAndMonth = {
                day: dayAndMonth[0],
                month: dayAndMonth[1]
            };

            return dayAndMonth;
        },
        selectedWeekDay: function() {
            return this.selectedDate.format("dddd");
        },
        todayIsEqualSelectDate: function() {
            return (
                this.selectedDate.format("YYYYMMDD") ===
                this.today.format("YYYYMMDD")
            );
        }
    },
    methods: {
        addMonth: function() {
            this.dateContext = this.nextMonth;
        },
        subtractMonth: function() {
            this.dateContext = this.previousMonth;
        },
        setSelectedDate: function(moment) {
            this.selectedDate = moment;
            this.selected = true
        },
        goToday: function() {
            this.selectedDate = this.today;
            this.dateContext = this.today;
        },
        formattingDay(day) {
            return ("0" + day).slice(-2);
        },
        getWeekDay(day) {
            let index = day;
            if (index > 7) {
                index %= 7;
            }
            index = index === 0 ? 6 : index - 1;
            return this.days[index];
        }
    },
    filters: {
        capitalize: function(value) {
            if (!value) return "";
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }

}
</script>