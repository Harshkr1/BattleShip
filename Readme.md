# ⚓ Battleship: TDD Edition

A classic implementation of the naval combat game built using **Vanilla JavaScript, HTML, and CSS**, following a strict **Test-Driven Development (TDD)** workflow.

---

## 🎯 The Rules

### The Objective

Sink your opponent’s entire fleet before they sink yours.

---

## 🚢 The Fleet

Each player receives **5 ships** of varying lengths:

| Ship         | Length |
|--------------|--------|
| Carrier      | 5      |
| Battleship   | 4      |
| Destroyer    | 3      |
| Submarine    | 3      |
| Patrol Boat  | 2      |

**Total ship squares:** 17

---

## 📐 Setup & Placement

- The game is played on a **10×10 grid**
- Ships can be placed **horizontally or vertically**
- Ships **cannot overlap**
- Ships **cannot be placed diagonally**
- Once the game starts, ships are **hidden from the opponent**

---

## 🎮 How to Play

- **Turns:** Players take turns calling out coordinates (e.g., `A-5`)
- **Hits & Misses:**
  - If a coordinate contains a ship, it’s a **Hit**
  - If the coordinate is empty, it’s a **Miss**
- **Sinking:** A ship is sunk once **every square it occupies has been hit**
- **Victory:** The first player to sink **all 17 squares** of the opponent’s fleet wins

---

## 🛠 Tech Stack & Methodology

- **Language:** Vanilla JavaScript (ES6+)
- **Styling:** CSS3
- **Structure:** HTML5
- **Testing:** Jest *(or your chosen test runner)*
- **Workflow:** Test-Driven Development (TDD)

### TDD Cycle

1. Write a **failing test** for a specific feature  
2. Write the **minimum code** required to make the test pass  
3. **Refactor** the code while keeping all tests green  

---

## 👨‍💻 Author

Harsh Kumar

Built with a focus on clean logic, testability, and core JavaScript fundamentals.
