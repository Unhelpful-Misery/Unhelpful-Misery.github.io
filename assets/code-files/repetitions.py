from __future__ import annotations
from datetime import date, timedelta
from dataclasses import dataclass
from abc import ABC, abstractmethod


@dataclass
class Repetition(ABC):
    @abstractmethod
    def repr(self) -> str:
        pass

    @staticmethod
    @abstractmethod
    def parse(s: str) -> Repetition:
        pass

    @abstractmethod
    def next_completion_date(self, last_completed: date) -> date:
        pass


@dataclass
class Daily(Repetition):
    interval: int

    def repr(self) -> str:
        return f"daily,{self.interval}"

    @staticmethod
    def parse(s: str) -> Repetition:
        interval = int(s)
        return Daily(interval)

    def next_completion_date(self, last_completed: date) -> date:
        return last_completed + timedelta(days=self.interval)


@dataclass
class Weekly(Repetition):
    interval: int
    days_of_week: list[int]

    def repr(self) -> str:
        days_of_week_string = ""
        for day_int in self.days_of_week:
            days_of_week_string += str(day_int)
        return f"weekly,{self.interval}-{days_of_week_string}"

    @staticmethod
    def parse(s: str) -> Repetition:
        parts = s.split("-")
        interval = int(parts[0])
        days_of_week = sorted([int(char) for char in parts[1]])
        return Weekly(interval, days_of_week)

    def next_completion_date(self, last_completed: date) -> date:
        last_completed_weekday = last_completed.weekday()
        mod = lambda a, b: ((a % b) + b) % b
        max_weekday_before_last_completed = (
            max(
                day
                for day in self.days_of_week + [day + 7 for day in self.days_of_week]
                if day <= last_completed_weekday + 7
            )
            % 7
        )
        since_last = timedelta(
            days=mod(last_completed_weekday - max_weekday_before_last_completed, 7)
        )
        demoted_day = last_completed - since_last
        demoted_weekday = demoted_day.weekday()
        if demoted_weekday < self.days_of_week[-1]:
            to_next = timedelta(
                days=min(day for day in self.days_of_week if day > demoted_weekday)
                - demoted_weekday
            )
            return last_completed + to_next
        else:
            to_next = timedelta(
                days=self.interval * 7 + self.days_of_week[0] - demoted_weekday
            )
            return demoted_day + to_next


# @dataclass
# class Yearly(Repetition):
#     interval: int
#     month: int
#     day: int


match_cases = {"daily": Daily, "weekly": Weekly}
