from __future__ import annotations
from datetime import date, datetime
from dataclasses import dataclass
import repetitions


DATA_FILE = "./Checklist-Data.txt"


@dataclass
class Entry:
    name: str
    last_completed: date
    repetition: repetitions.Repetition

    def __str__(self) -> str:
        to_complete = self.repetition.next_completion_date(self.last_completed)
        if date.today() < to_complete:
            return f"{self.name} ({(to_complete - date.today()).days} days)"
        else:
            return f"{self.name}"

    def __repr__(self) -> str:
        return f"{self.name},{self.last_completed},{self.repetition.repr()}"


def parse_line(s: str) -> Entry:
    parts = s.split(",")
    name = parts[0]
    last_completed = datetime.strptime(parts[1], "%Y-%m-%d").date()
    repetition_type = parts[2]
    repetition = repetitions.match_cases[repetition_type].parse(parts[3])
    return Entry(name, last_completed, repetition)


def get_entries(filename: str) -> list[Entry]:
    with open(filename, "r") as file:
        entries = []
        for line in file:
            entries.append(parse_line(line.strip()))
    return entries


def color_print(s: str, color: int) -> None:
    print(f"\x1b[{color}m{s}\x1b[0m")


def show_tasks(
    entries: list[Entry],
    *,
    show_overdue: bool = True,
    show_today: bool = True,
    show_future: bool = True,
) -> None:
    entries = sorted(
        entries,
        reverse=True,
        key=lambda entry: entry.repetition.next_completion_date(entry.last_completed)
    )
    today = date.today()
    print()
    if show_future:
        for entry in entries:
            if entry.repetition.next_completion_date(entry.last_completed) > today:
                color_print(str(entry), 90)
    print()
    if show_today:
        for entry in entries:
            if entry.repetition.next_completion_date(entry.last_completed) == today:
                color_print(str(entry), 94)
    print()
    if show_overdue:
        for entry in entries:
            if entry.repetition.next_completion_date(entry.last_completed) < today:
                color_print(str(entry), 31)
    print()


def save_entries(filename: str, entries: list[Entry]) -> None:
    with open(filename, "w") as file:
        file.write("\n".join(repr(entry) for entry in entries))


def main() -> None:
    show_future = False
    entries = get_entries(DATA_FILE)
    while True:
        show_tasks(entries, show_future=show_future)
        while True:
            inp = input("q=quit d=display\nCompleted item: ")
            if inp == "q":
                save_entries(DATA_FILE, entries)
                return
            elif inp == "d":
                show_future = not show_future
                break
            match [
                entry for entry in entries if entry.name.lower().startswith(inp.lower())
            ]:
                case []:
                    print("\nNo matching entries\n")
                case [entry]:
                    entry.last_completed = date.today()
                    save_entries(DATA_FILE, entries)
                    break
                case _:
                    print(
                        "\nQuery is ambiguous. Please do it again I'm too dumb to read your mind.\n"
                    )


if __name__ == "__main__":
    main()
