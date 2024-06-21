"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.scss'
const Schedule = () => {
  const formatTime = (date) => {
    return date.toTimeString().slice(0, 5);
  };

  const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
  };

  const addSeconds = (date, seconds) => {
    return new Date(date.getTime() + seconds * 1000);
  };

  const examStart = new Date();
  examStart.setHours(15, 5, 0, 0);

  const preparationTime = 20; // minutes
  const answerTime = 3; // minutes

  const people = 25;

  const names = [
    'Dasha', 'Fedya', 'Danik', 'Vanya', 'Maksim',
    'Alina', 'Kirill D', 'Seva', 'Diana', 'Nikita A',
    'Polina Sh', 'Anya', 'Yegor', 'Vika', 'Varya',
    'Angelina', 'Polina N', 'Arseniy', 'Vadim', 'Nikita S',
    'Ksyusha', 'Vlad', 'Nastya S', 'Kirill M', 'Katya'
  ];

  const schedule = [];

  for (let i = 0; i < people; i++) {
    let enterTime, startAnswerTime, exitTime;

    if (i < 5) {
      // The first five people enter simultaneously
      enterTime = examStart;
      startAnswerTime = addMinutes(examStart, preparationTime + answerTime * i);
    } else {
      // The following people enter right after the previous person finishes answering
      enterTime = schedule[i - 5].exitTime;
      startAnswerTime = addMinutes(enterTime, preparationTime);
    }

    // The exit time of each person - after answering
    exitTime = addMinutes(startAnswerTime, answerTime);

    schedule.push({
      person: i + 1,
      name: names[i] || 'noname',
      enterTime: enterTime,
      startAnswerTime: startAnswerTime,
      exitTime: exitTime
    });
  }

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (

    <div style={{display: 'flex', alignItems: 'center' , justifyContent: 'center'}}>
     
      <div className={styles.block}>
      <h1 >Exam Schedule</h1>
        {schedule.map((item) => {
          const isActive =
            currentTime >= item.enterTime && currentTime <= item.exitTime;

          return (
            <div
              key={item.person}
              style={{ color: isActive ? 'red' : 'gray' }}
            >
              <p>{`№${item.person} - (${item.name})`}</p>
              <div style={{display: 'flex', gap: '24px'}}>
                <p>{`start: ${formatTime(item.enterTime)}`}</p>
                <p>{`exit: ${formatTime(item.exitTime)}`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
