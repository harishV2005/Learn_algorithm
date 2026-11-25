<div align="center">
🧠 Learn_algorithm

Algorithms I wrote from scratch, plus a visualizer that shows every step.

Live Demo Status

Show Image Show Image Show Image Show Image Show Image

▶ Try it live · 📂 Browse the code · 🐛 Report an issue

</div>
📖 About

Reading an explanation of an algorithm is easy. Writing it from an empty file is where the gaps show up. This repo is where I close those gaps: I pick a topic, implement it without looking at a finished solution, then compare against better versions and write down what I missed.

Some of the code is rough. I keep early attempts on purpose because they show what I got wrong the first time.

🚀 Live demo: TraceLab

TraceLab is a step-by-step execution visualizer for sorting and searching algorithms. It records the state of the array after every step, so you can see exactly where a pointer moves or an element swaps. It supports Java, C++ and Python.

	
🔗 Demo	tracelab-1.ai.studio
🎯 Example	Binary search on 29, 10, 14, 37, 13, 22, 8, 34, 22, 11, 67, target 14
🧪 Covers	Sorting and searching

Change the array or the target in the link to run your own case. The state is stored in the URL, so you can share any run by copying the address.

✅ What's covered
[ ] 🔍 Searching (linear, binary)
[ ] 📊 Sorting (bubble, insertion, merge, quick)
[ ] 🔁 Recursion and backtracking
[ ] 🔗 Linked lists, stacks and queues
[ ] 🌳 Trees and binary search trees
[ ] 🕸️ Graphs (BFS, DFS, shortest paths)
[ ] 🧩 Dynamic programming
[ ] 💰 Greedy algorithms
⏱️ Complexity cheat sheet
Algorithm	Best	Average	Worst	Extra space	Notes
Linear search	O(1)	O(n)	O(n)	O(1)	Works on unsorted data
Binary search	O(1)	O(log n)	O(log n)	O(1)	Input must be sorted
Bubble sort	O(n)	O(n²)	O(n²)	O(1)	Best case needs an early-exit check
Insertion sort	O(n)	O(n²)	O(n²)	O(1)	Fast on nearly sorted data
Merge sort	O(n log n)	O(n log n)	O(n log n)	O(n)	Stable
Quick sort	O(n log n)	O(n log n)	O(n²)	O(log n)	Bad pivots cause the worst case
🎯 Interview notes

Things I make sure I can explain for each algorithm, out loud, without code in front of me:

Why it works. The invariant that holds after each step. For binary search: if the target exists, it is always inside [low, high].
Where it breaks. Empty input, one element, duplicates, already sorted input, reverse sorted input.
The classic bugs. Off-by-one in loop bounds. Integer overflow in (low + high) / 2, which is why low + (high - low) / 2 is safer in Java and C++.
The trade-off. Why I'd pick one algorithm over another for a given input size and memory limit.
The follow-up. What changes if the data is huge, streaming, or doesn't fit in memory.
🛠️ How I work through each problem
Write down the input, the output and the constraints.
Attempt a solution without looking anything up.
Test small cases first, then the awkward ones.
State the time and space complexity.
Compare with a reference solution and note what I'd change.
▶️ Running the code

Each solution is self-contained. Open the file for the topic you want and run it with the usual tooling for its language (Java, C++ or Python). To watch it instead of reading it, paste the same case into TraceLab.

🤝 Contributing

Found a bug, a cleaner approach, or an edge case I missed? Open an issue or send a pull request. If you suggest a different solution, a short note on why it's better helps me learn from it.

👤 Author

Harish GitHub

📄 License

Released under the MIT License. Use the code however you like.

<div align="center">

⭐ If this helped you, a star on the repo is appreciated.

</div>
