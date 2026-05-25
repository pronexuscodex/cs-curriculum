import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════
   RESOURCE DATA
════════════════════════════════════════════════════════ */
const resourcesByPhase = {
  1: {
    courses: [
      { name: "MIT 6.042J — Mathematics for Computer Science", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/", tag: "MIT OCW", stars: 5 },
      { name: "Discrete Mathematics — UC San Diego", url: "https://www.coursera.org/specializations/discrete-mathematics", tag: "Coursera", stars: 5 },
      { name: "CS50x — Harvard's Intro to Computer Science", url: "https://cs50.harvard.edu/x/", tag: "Harvard", stars: 5 },
      { name: "Discrete Math — Shanghai Jiao Tong University", url: "https://www.coursera.org/learn/discrete-mathematics", tag: "Coursera", stars: 4 },
      { name: "Khan Academy: Logic & Proofs", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:logic", tag: "Khan", stars: 4 },
      { name: "Codecademy: Discrete Math", url: "https://www.codecademy.com/learn/discrete-math", tag: "Codecademy", stars: 3 },
    ],
    books: [
      { name: "Discrete Math: An Open Introduction (free PDF)", url: "https://discrete.openmathbooks.org/", tag: "Free Book" },
      { name: "A Cool Brisk Walk Through Discrete Math", url: "https://www.allthemath.org/", tag: "Free Book" },
      { name: "MIT 6.042J Lecture Notes (free)", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/pages/readings/", tag: "Free Notes" },
      { name: "The C Programming Language — Kernighan & Ritchie", url: "https://en.wikipedia.org/wiki/The_C_Programming_Language", tag: "Classic" },
    ],
    practice: [
      { name: "GeeksforGeeks: Discrete Mathematics Tutorial", url: "https://www.geeksforgeeks.org/engineering-mathematics/discrete-mathematics-tutorial/", tag: "Practice" },
      { name: "VisuAlgo — Algorithm Visualizer", url: "https://visualgo.net/", tag: "Visual" },
      { name: "Brilliant.org: Logic", url: "https://brilliant.org/courses/logic/", tag: "Interactive" },
    ],
    videos: [
      { name: "MIT 6.042 Full Lecture Series (YouTube)", url: "https://www.youtube.com/playlist?list=PLB7540DEDD482705B", tag: "YouTube" },
      { name: "Trefor Bazett: Discrete Math Full Course", url: "https://www.youtube.com/watch?v=rdXw7Ps9vxc&list=PLHXZ9OQGMqxersk8fUxiUMSIx0DBqsKZS", tag: "YouTube" },
    ],
  },
  2: {
    courses: [
      { name: "MIT 6.096 — Introduction to C & C++", url: "https://ocw.mit.edu/courses/6-s096-introduction-to-c-and-c-january-iap-2013/", tag: "MIT OCW", stars: 5 },
      { name: "MIT 6.087 — Practical Programming in C", url: "https://ocw.mit.edu/courses/6-087-practical-programming-in-c-january-iap-2010/", tag: "MIT OCW", stars: 5 },
      { name: "CS50x — Psets 3–5: Arrays, Memory, Data Structures", url: "https://cs50.harvard.edu/x/", tag: "Harvard", stars: 5 },
      { name: "C Programming: Pointers & Memory — Dartmouth", url: "https://www.coursera.org/learn/c-programming-pointers-and-memory-management", tag: "Coursera", stars: 4 },
    ],
    books: [
      { name: "Beej's Guide to C Programming (free)", url: "https://beej.us/guide/bgc/", tag: "Free Book" },
      { name: "Build Your Own Lisp — learn C by building a language", url: "http://www.buildyourownlisp.com/", tag: "Free Book" },
      { name: "Learn C the Hard Way (online chapters)", url: "https://learncodethehardway.org/c/", tag: "Free Chapters" },
    ],
    practice: [
      { name: "GeeksforGeeks: Graph Algorithms", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/", tag: "Practice" },
      { name: "VisuAlgo: Graph Traversal Visualizer", url: "https://visualgo.net/en/graphds", tag: "Visual" },
      { name: "CS Circles (Waterloo) — C Exercises", url: "https://cscircles.cemc.uwaterloo.ca/", tag: "Interactive" },
    ],
    videos: [
      { name: "Jacob Sorber: C Pointers Deep Dive (YouTube)", url: "https://www.youtube.com/c/JacobSorber", tag: "YouTube" },
      { name: "Low Level Learning (YouTube)", url: "https://www.youtube.com/@LowLevelLearning", tag: "YouTube" },
    ],
  },
  3: {
    courses: [
      { name: "MIT 6.006 — Introduction to Algorithms", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", tag: "MIT OCW", stars: 5 },
      { name: "MIT 6.046J — Design & Analysis of Algorithms", url: "https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/", tag: "MIT OCW", stars: 5 },
      { name: "Stanford: Algorithms Design & Analysis (Tim Roughgarden)", url: "https://www.coursera.org/specializations/algorithms", tag: "Coursera", stars: 5 },
      { name: "UC Berkeley CS61B — Data Structures", url: "https://datastructur.es/", tag: "Berkeley", stars: 5 },
      { name: "Georgia Tech: Data Structures & Algorithms", url: "https://www.coursera.org/specializations/data-structures-algorithms-georgia-tech", tag: "Coursera", stars: 4 },
    ],
    books: [
      { name: "CLRS — Introduction to Algorithms (MIT Press)", url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/", tag: "Textbook" },
      { name: "The Algorithm Design Manual — Skiena", url: "http://www.algorist.com/", tag: "Textbook" },
      { name: "Open Data Structures (free PDF)", url: "https://opendatastructures.org/", tag: "Free Book" },
    ],
    practice: [
      { name: "LeetCode (free tier — hundreds of problems)", url: "https://leetcode.com/", tag: "Practice" },
      { name: "VisuAlgo — Trees, Sorting, Graphs", url: "https://visualgo.net/", tag: "Visual" },
      { name: "HackerRank: Data Structures Track", url: "https://www.hackerrank.com/domains/data-structures", tag: "Practice" },
      { name: "USACO Training", url: "https://train.usaco.org/", tag: "Competitive" },
    ],
    videos: [
      { name: "MIT 6.006 Fall 2011 Full Lectures (YouTube)", url: "https://www.youtube.com/playlist?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb", tag: "YouTube" },
      { name: "Abdul Bari: Algorithms Full Course", url: "https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O", tag: "YouTube" },
    ],
  },
  4: {
    courses: [
      { name: "CMU 15-213 — Introduction to Computer Systems (CSAPP)", url: "https://www.cs.cmu.edu/~213/", tag: "CMU", stars: 5 },
      { name: "Nand2Tetris Part I & II — Build a Computer from NAND", url: "https://www.coursera.org/learn/build-a-computer", tag: "Coursera", stars: 5 },
      { name: "Berkeley CS162 — Operating Systems & Systems Programming", url: "https://cs162.org/", tag: "Berkeley", stars: 5 },
      { name: "MIT 6.004 — Computation Structures", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", tag: "MIT OCW", stars: 5 },
      { name: "CMU: Introduction to Computer Architecture (YouTube)", url: "https://www.youtube.com/playlist?list=PL5PHm2jkkXmidJOd59REog9jDnPDTG6IJ", tag: "YouTube", stars: 5 },
      { name: "Georgia Tech: Advanced Operating Systems", url: "https://www.udacity.com/course/advanced-operating-systems--ud189", tag: "Udacity", stars: 4 },
    ],
    books: [
      { name: "CS:APP — Computer Systems: A Programmer's Perspective", url: "https://csapp.cs.cmu.edu/", tag: "Textbook" },
      { name: "Operating Systems: Three Easy Pieces (free PDF)", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/", tag: "Free Book" },
      { name: "xv6 — MIT's Teaching Operating System (free)", url: "https://pdos.csail.mit.edu/6.828/2023/xv6.html", tag: "Free OS" },
      { name: "The Elements of Computing Systems (Nand2Tetris book)", url: "https://www.nand2tetris.org/book", tag: "Textbook" },
    ],
    practice: [
      { name: "CSAPP Labs — bomb lab, buffer overflow, malloc lab", url: "https://csapp.cs.cmu.edu/3e/labs.html", tag: "Labs" },
      { name: "OSDev Wiki — Write an OS from scratch", url: "https://wiki.osdev.org/", tag: "Reference" },
      { name: "Write a Simple OS from Scratch (GitHub tutorial)", url: "https://github.com/cfenollosa/os-tutorial", tag: "Tutorial" },
    ],
    videos: [
      { name: "MIT 6.828 OS Engineering Full Lectures (YouTube)", url: "https://www.youtube.com/watch?v=y2oy-mRQlGE&list=PLfciLKR3SgqNJKKIKUliWoNBBH1Vhl-xD", tag: "YouTube" },
      { name: "Low Level Learning: OS Development Series", url: "https://www.youtube.com/@LowLevelLearning", tag: "YouTube" },
    ],
  },
  5: {
    courses: [
      { name: "MIT 6.824 — Distributed Systems (Robert Morris)", url: "https://pdos.csail.mit.edu/6.824/", tag: "MIT", stars: 5 },
      { name: "Stanford CS144 — Introduction to Computer Networks", url: "https://cs144.github.io/", tag: "Stanford", stars: 5 },
      { name: "Georgia Tech: Computer Networking", url: "https://www.coursera.org/learn/computer-networking", tag: "Coursera", stars: 5 },
      { name: "Cambridge: Distributed Systems — 8 Lectures", url: "https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB", tag: "YouTube", stars: 5 },
      { name: "Distributed Systems Course (free website)", url: "https://www.distributedsystemscourse.com/", tag: "Free", stars: 4 },
    ],
    books: [
      { name: "Beej's Guide to Network Programming (free)", url: "https://beej.us/guide/bgnet/", tag: "Free Book" },
      { name: "Designing Data-Intensive Applications — Kleppmann", url: "https://dataintensive.net/", tag: "Textbook" },
      { name: "Distributed Systems — Tanenbaum 3rd Ed (free PDF)", url: "https://www.distributed-systems.net/index.php/books/ds3/", tag: "Free Book" },
      { name: "Computer Networking: A Top-Down Approach", url: "https://gaia.cs.umass.edu/kurose_ross/index.html", tag: "Textbook" },
    ],
    practice: [
      { name: "MIT 6.824 Labs — Raft, MapReduce, KV Store", url: "https://pdos.csail.mit.edu/6.824/labs/lab-mr.html", tag: "Labs" },
      { name: "PingCAP Talent Plan: Distributed Systems in Rust", url: "https://github.com/pingcap/talent-plan", tag: "GitHub" },
    ],
    videos: [
      { name: "MIT 6.824 Spring 2020 Full Lectures (YouTube)", url: "https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB", tag: "YouTube" },
      { name: "Martin Kleppmann: Distributed Systems Lectures", url: "https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB", tag: "YouTube" },
    ],
  },
  6: {
    courses: [
      { name: "Stanford Compilers — Alex Aiken", url: "https://www.classcentral.com/course/compilers-328", tag: "Stanford", stars: 5 },
      { name: "Cornell CS6120 — Advanced Compilers (free, open)", url: "https://www.cs.cornell.edu/courses/cs6120/2020fa/", tag: "Cornell", stars: 5 },
      { name: "Udacity: Programming Languages", url: "https://www.udacity.com/course/programming-languages--cs262", tag: "Udacity", stars: 4 },
      { name: "Write an Interpreter in Go (Monkey Language)", url: "https://interpreterbook.com/", tag: "Book/Course", stars: 4 },
    ],
    books: [
      { name: "Crafting Interpreters — Bob Nystrom (fully free online)", url: "https://www.craftinginterpreters.com/", tag: "Free Book" },
      { name: "Build Your Own Lisp — learn C by writing a Lisp", url: "http://www.buildyourownlisp.com/", tag: "Free Book" },
      { name: "SICP — Structure and Interpretation of Computer Programs", url: "https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html", tag: "Free Book" },
      { name: "Dragon Book — Compilers: Principles, Techniques (Aho)", url: "https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools", tag: "Classic" },
    ],
    practice: [
      { name: "LLVM Tutorial — Building a JIT Compiler", url: "https://llvm.org/docs/tutorial/", tag: "Tutorial" },
      { name: "Write a Brainfuck Interpreter (starter exercise)", url: "https://esolangs.org/wiki/Brainfuck", tag: "Exercise" },
      { name: "Matt Might's Blog: Compilers & Programming Languages", url: "https://matt.might.net/articles/", tag: "Blog" },
    ],
    videos: [
      { name: "Stanford Compilers Full Lecture Series (YouTube)", url: "https://www.youtube.com/watch?v=sm0QQO-WZlM&list=PLTW_jEXtShYJVZr3fIXkr9LVE6IVpqOmS", tag: "YouTube" },
      { name: "Tsoding: Writing a Programming Language in C", url: "https://www.youtube.com/@tsoding", tag: "YouTube" },
    ],
  },
  7: {
    courses: [
      { name: "CMU 15-445 — Introduction to Database Systems", url: "https://15445.courses.cs.cmu.edu/", tag: "CMU", stars: 5 },
      { name: "CMU 15-721 — Advanced Database Systems", url: "https://15721.courses.cs.cmu.edu/", tag: "CMU", stars: 5 },
      { name: "UC Berkeley CS186 — Introduction to Database Systems", url: "https://cs186berkeley.net/", tag: "Berkeley", stars: 5 },
      { name: "Stanford: Databases Advanced Topics in SQL (edX)", url: "https://online.stanford.edu/courses/soe-ydatabases0005-databases-advanced-topics-sql", tag: "Stanford", stars: 4 },
    ],
    books: [
      { name: "Readings in Database Systems — The Red Book (free)", url: "http://www.redbook.io/", tag: "Free Book" },
      { name: "Designing Data-Intensive Applications — Kleppmann", url: "https://dataintensive.net/", tag: "Textbook" },
      { name: "Modern B-Tree Techniques (free research paper)", url: "https://w6113.github.io/files/papers/btreesurvey-graefe.pdf", tag: "Free Paper" },
      { name: "Database Internals — Alex Petrov", url: "https://www.databass.dev/", tag: "Textbook" },
    ],
    practice: [
      { name: "CMU 15-445 BusTub Labs (GitHub)", url: "https://github.com/cmu-db/bustub", tag: "GitHub Labs" },
      { name: "Build Your Own SQLite (CodeCrafters)", url: "https://app.codecrafters.io/courses/sqlite/overview", tag: "Tutorial" },
      { name: "SQLite Source Code — study a real production DB", url: "https://www.sqlite.org/src/doc/trunk/README.md", tag: "Open Source" },
    ],
    videos: [
      { name: "CMU 15-445 Full Lecture Videos (YouTube)", url: "https://www.youtube.com/playlist?list=PLSE8ODhjZXjbj8BMuIrRcacnQh20hmY9g", tag: "YouTube" },
      { name: "Andy Pavlo: Database Internals Talks", url: "https://www.youtube.com/@CMUDatabaseGroup", tag: "YouTube" },
    ],
  },
  8: {
    courses: [
      { name: "Stanford: Cryptography I — Dan Boneh", url: "https://www.coursera.org/learn/crypto", tag: "Coursera", stars: 5 },
      { name: "Stanford: Cryptography II", url: "https://www.coursera.org/learn/crypto2", tag: "Coursera", stars: 5 },
      { name: "pwn.college — Binary Exploitation (fully free)", url: "https://pwn.college/", tag: "Free", stars: 5 },
      { name: "Cryptopals Challenges (free, self-paced)", url: "https://cryptopals.com/", tag: "Free", stars: 5 },
      { name: "OverTheWire: Wargames (free)", url: "https://overthewire.org/wargames/", tag: "Free Labs", stars: 5 },
      { name: "OpenSecurityTraining2 — Free OS Security Courses", url: "https://opensecuritytraining.info/", tag: "Free", stars: 4 },
    ],
    books: [
      { name: "A Graduate Course in Applied Cryptography (free PDF)", url: "https://toc.cryptobook.us/", tag: "Free Book" },
      { name: "Hacking: The Art of Exploitation — Erickson", url: "https://nostarch.com/hacking2.htm", tag: "Textbook" },
      { name: "Serious Cryptography — Jean-Philippe Aumasson", url: "https://nostarch.com/seriouscrypto", tag: "Textbook" },
    ],
    practice: [
      { name: "CryptoHack.org — Cryptography Challenges", url: "https://cryptohack.org/", tag: "Practice" },
      { name: "picoCTF — Free CTF Platform for Beginners", url: "https://picoctf.org/", tag: "CTF" },
      { name: "OWASP WebGoat — Secure Coding Practice", url: "https://owasp.org/www-project-webgoat/", tag: "Practice" },
      { name: "CTFtime.org — CTF Competition Calendar", url: "https://ctftime.org/", tag: "CTF" },
    ],
    videos: [
      { name: "LiveOverflow: Hacking & Binary Exploitation (YouTube)", url: "https://www.youtube.com/@LiveOverflow", tag: "YouTube" },
      { name: "Dan Boneh: Cryptography Full Lecture Series", url: "https://www.youtube.com/watch?v=2aHkqB2-46k&list=PL9oqNDMzcMClAPkp4pne89hWBFGmhw29Y", tag: "YouTube" },
    ],
  },
};

/* ════════════════════════════════════════════════════════
   PHASE DATA
════════════════════════════════════════════════════════ */
const phases = [
  {
    id:1, title:"Mathematical Logic, Binary Systems & Foundations", shortTitle:"Math & Logic",
    color:"#C8F542", darkColor:"#1c2800", icon:"∴", tagline:"From transistors to truth — where computation is born",
    difficulty:"Foundations", weeks:"6–8 weeks",
    math:["Propositions, Boolean algebra, and truth tables","Logical equivalence, implication, XOR, De Morgan's Laws","Sets, relations, and functions","Proof techniques: induction, contradiction, contraposition","Recursion mathematics and structural induction","Binary arithmetic, modular arithmetic, number systems"],
    hardware:["Transistors as switches and voltage states","Logic gates: AND, OR, NOT, NAND, NOR, XOR","Binary encoding and machine representation","ALUs, registers, and CPU execution cycles","Instruction pipelines and bit manipulation","Memory cells and cache fundamentals"],
    cpp:["Variables, primitive types, signed vs unsigned integers","Integer overflow and binary representation","Loops, branching, functions, arrays, strings","Bitwise operations: AND, OR, XOR, shift","Stack memory layout and compiler basics"],
    projects:[
      {name:"Logic Gate Simulator", letter:"A", items:["Dynamic truth table generation","Logical expression parser","Binary evaluation engine","NAND / NOR / XOR / implication support"]},
      {name:"Binary Arithmetic Engine", letter:"B", items:["Binary add / subtract / multiply","Bit shifting left and right","Overflow detection","Signed integer representation (two's complement)"]},
    ],
    pedagogy:["Explain intuitively → formally → hardware → memory → CPU → C → implementation","Derive every truth table from first-principle axioms","Connect Boolean algebra directly to gate circuits","Trace binary arithmetic through registers step-by-step"],
    checklist:{
      theory:["Prove De Morgan's Laws from axioms","Derive truth tables for compound expressions","Solve modular arithmetic problems","Explain all CPU pipeline stages"],
      programming:["Implement a full Boolean expression evaluator in C","Write bitwise operations without arithmetic operators","Debug integer overflow using gdb","Analyze binary representation of floating-point numbers"],
      engineering:["Build a 4-bit adder simulation","Implement binary-to-decimal converter","Measure bit manipulation performance","Explain cache line implications of data layout"],
    },
    challenges:["Prove that NAND alone is functionally complete","Implement multiplication using only bit shifts and addition","Derive two's complement representation from first principles","Build a 1-bit full adder circuit diagram and implement it in C"],
  },
  {
    id:2, title:"Memory, Pointers, Graphs & Dynamic Data Structures", shortTitle:"Memory & Graphs",
    color:"#42C8F5", darkColor:"#001c26", icon:"→", tagline:"The machine's memory is yours to command",
    difficulty:"Intermediate", weeks:"6–8 weeks",
    math:["Graph theory: directed and undirected graphs, trees","Weighted graphs and adjacency representations","Graph traversal algorithms: BFS, DFS","Combinatorics fundamentals","Recurrence relations and their solutions","Probability basics for algorithm analysis"],
    hardware:["RAM architecture and address spaces","Stack vs heap physical memory layout","Pointer dereferencing at the machine level","Cache locality, spatial locality, prefetching","TLB and virtual address translation","Memory fragmentation effects"],
    cpp:["Pointers and pointer arithmetic","Memory addresses and levels of indirection","malloc / calloc / realloc / free","Structs, linked lists, queues, stacks","Recursion internals and stack frame layout","Debugging segmentation faults and memory corruption"],
    projects:[
      {name:"Graph Library", letter:"A", items:["Adjacency list representation","BFS and DFS implementations","Shortest path with Dijkstra's algorithm","Cycle detection","Topological sorting","Graph serialization to file"]},
      {name:"Custom Memory Allocator", letter:"B", items:["Simulate malloc / free from scratch","Heap block management","Free-list implementation","Fragmentation handling","Allocation tracking and debugging utilities"]},
    ],
    pedagogy:["Draw ASCII RAM diagrams for every pointer dereference","Trace linked list traversal at the raw address level","Show heap allocation maps before and after each malloc/free","Measure and explain cache miss cost with real timing data"],
    checklist:{
      theory:["Prove BFS visits all reachable nodes","Derive Dijkstra's correctness from its loop invariant","Analyze recurrence for recursive DFS","Explain virtual memory paging and the TLB"],
      programming:["Implement a doubly-linked list with full memory safety","Write a stack using dynamic arrays","Debug a use-after-free error with Valgrind","Implement BFS and DFS iteratively (no recursion)"],
      engineering:["Build a memory pool allocator","Measure cache performance: array vs linked list traversal","Serialize and deserialize a graph to binary file","Implement a cycle detector for directed graphs"],
    },
    challenges:["Implement a lock-free stack using atomic compare-and-swap","Write a mark-and-sweep garbage collector for a custom arena","Prove topological sort produces a valid linear ordering","Build a graph isomorphism checker"],
  },
  {
    id:3, title:"Algorithms, Trees & Complexity Theory", shortTitle:"Algorithms",
    color:"#F5A742", darkColor:"#251700", icon:"Θ", tagline:"Measure everything — nothing is free",
    difficulty:"Intermediate", weeks:"8–10 weeks",
    math:["Asymptotic analysis: Big-O, Big-Θ, Big-Ω","Recurrence solving: Master Theorem, substitution, recursion trees","Divide and conquer algorithmic paradigm","Combinatorial analysis and counting","Probability theory in algorithm analysis","Amortized analysis techniques"],
    hardware:["CPU branch prediction and mis-prediction penalties","Cache hierarchy and its effect on algorithm choice","Memory access patterns, prefetching, stride","Register pressure in tight inner loops","SIMD vectorization opportunities"],
    cpp:["Binary Search Trees, AVL Trees, Red-Black Trees","Heaps and priority queues","Hash tables with open and closed addressing","Tries and disjoint set union (union-find)","Profiling and benchmarking in C","Precise timing with clock_gettime"],
    projects:[
      {name:"AVL Tree Engine", letter:"A", items:["Insertion and deletion","Rotations and self-balancing","In-order, pre-order, post-order traversal","Performance measurement harness","Serialization to disk"]},
      {name:"Hash Table Database Engine", letter:"B", items:["Open and closed addressing","Custom hash functions","Dynamic resizing with rehashing","Persistence layer","Full benchmarking harness"]},
    ],
    pedagogy:["Derive every complexity bound directly from the recurrence","Draw recursion trees for divide-and-conquer algorithms","Profile real C code to confirm asymptotic predictions","Compare cache behavior of BST vs contiguous array"],
    checklist:{
      theory:["Apply the Master Theorem to 5+ distinct recurrences","Prove AVL tree height bound is O(log n)","Derive amortized cost of dynamic array resize","Prove correctness of Quicksort partition step"],
      programming:["Implement a Red-Black Tree from scratch in C","Build a min-heap with decrease-key operation","Write a perfect hash function for a known key set","Implement radix sort and formally analyze it"],
      engineering:["Benchmark BST vs hash table for 10 million operations","Profile AVL rotations under adversarial input sequences","Tune hash function to minimize collisions","Implement a cache-oblivious B-tree memory layout"],
    },
    challenges:["Implement a van Emde Boas tree","Prove the lower bound Ω(n log n) for comparison-based sorting","Build a self-adjusting splay tree","Derive the exact leading constant in quicksort's average case"],
  },
  {
    id:4, title:"Computer Architecture & Operating Systems", shortTitle:"Arch & OS",
    color:"#F542A7", darkColor:"#260018", icon:"⚙", tagline:"The OS is just software — so build one",
    difficulty:"Advanced", weeks:"10–12 weeks",
    math:["Boolean algebra applied to instruction encoding","Modular arithmetic in memory addressing","Scheduling theory and basic queueing models","Deadlock detection via resource allocation graphs","Virtual memory address translation mathematics"],
    hardware:["CPU pipeline stages: fetch, decode, execute, memory, writeback","Out-of-order execution and speculative execution","Memory hierarchy: L1 / L2 / L3 cache, DRAM","TLB, page tables, and ASLR","Interrupt controllers and IRQ handling","DMA, I/O buses, and device drivers"],
    cpp:["x86-64 and RISC-V assembly fundamentals","System calls and the kernel/user privilege boundary","Process creation with fork/exec","Threads with pthreads library","Mutex, semaphore, condition variables","File system calls: open / read / write / mmap"],
    projects:[
      {name:"Mini Unix Shell", letter:"A", items:["Command-line parsing","Process spawning with fork/exec","Pipes and I/O redirection","Job control: fg / bg / &","Built-in commands: cd, exit, history"]},
      {name:"Toy OS Kernel", letter:"B", items:["Boot sequence explanation","Paging and memory management","Round-robin task scheduler","Interrupt handling","VGA console driver","System call interface"]},
    ],
    pedagogy:["Trace a system call from user space through the kernel and back","Walk a virtual address through its page table entries","Demonstrate a context switch with full register save/restore","Implement and measure multiple scheduling algorithms"],
    checklist:{
      theory:["Explain all 5 CPU pipeline stages with examples","Prove the 4 Coffman conditions for deadlock","Derive the virtual address translation formula","Compare SJF, Round-Robin, and CFS scheduling"],
      programming:["Write a Unix shell with full job control","Implement a reader-writer lock from scratch","Build a memory allocator using mmap","Write a simple Linux kernel module"],
      engineering:["Boot a minimal OS kernel on QEMU","Implement a filesystem in user space with FUSE","Measure context switch overhead precisely","Build a process monitor by parsing /proc"],
    },
    challenges:["Implement priority inheritance for mutexes to prevent priority inversion","Build a wait-free ring buffer for producer-consumer","Write a memory profiler using ptrace","Implement a minimal hypervisor using the KVM API"],
  },
  {
    id:5, title:"Networking & Distributed Systems", shortTitle:"Networks",
    color:"#A742F5", darkColor:"#160028", icon:"⇌", tagline:"Networks fail — design for it",
    difficulty:"Advanced", weeks:"8–10 weeks",
    math:["Graph theory applied to network routing","Queueing theory for network performance modeling","Information theory basics and Shannon entropy","Consistency models and the CAP theorem","Paxos and Raft consensus algorithm mathematics","Bloom filters and probabilistic data structures"],
    hardware:["NIC hardware and interrupt coalescing","Kernel bypass networking with DPDK","TCP checksum offloading","Memory-mapped network I/O buffers","RDMA concepts and remote direct memory access"],
    cpp:["BSD socket API: socket / bind / listen / accept / connect","Concurrent TCP servers: multi-process, threaded, epoll","UDP communication","Non-blocking I/O: select / poll / epoll","HTTP/1.1 request and response parsing","TLS fundamentals with OpenSSL"],
    projects:[
      {name:"HTTP/1.1 Web Server", letter:"A", items:["TCP socket connection handling","Full HTTP/1.1 request parser","Static file serving","Concurrent connections via epoll","Access logging","Keep-alive connection support"]},
      {name:"Distributed Key-Value Store", letter:"B", items:["Consistent hashing ring","Multi-node replication protocol","Basic Raft consensus implementation","Fault tolerance on node failure","Client library with retries"]},
    ],
    pedagogy:["Trace a packet from application layer through TCP/IP to the wire","Walk through the 3-way TCP handshake with sequence numbers","Explain the CAP theorem with concrete real-world examples","Demonstrate a split-brain scenario and its resolution"],
    checklist:{
      theory:["Explain all 7 OSI layers with concrete examples","Derive the TCP congestion window algorithm","Prove the CAP theorem impossibility result","Explain Raft leader election safety invariants"],
      programming:["Build a TCP chat server with epoll event loop","Implement HTTP chunked transfer encoding","Write a recursive DNS resolver from scratch","Implement consistent hashing with virtual nodes"],
      engineering:["Deploy a 3-node Raft cluster and test failover","Measure TCP vs UDP throughput for bulk transfer","Build a load balancer with health checks","Implement a connection pool for database clients"],
    },
    challenges:["Implement the Phi Accrual failure detector","Build a vector clock library for distributed event causality","Prove Paxos ensures safety under network partition","Implement a grow-only CRDT (conflict-free replicated data type)"],
  },
  {
    id:6, title:"Compilers, Interpreters & Language Engineering", shortTitle:"Compilers",
    color:"#F5E242", darkColor:"#252300", icon:"λ", tagline:"Languages are just programs — write one",
    difficulty:"Advanced", weeks:"10–12 weeks",
    math:["Formal grammars: regular, context-free, context-sensitive","The Chomsky hierarchy of language classes","Automata theory: DFA, NFA, pushdown automata","Regular expressions and the Kleene star","Type theory foundations","Lambda calculus and beta reduction"],
    hardware:["Call stack layout and calling conventions (System V ABI)","Register allocation and register spilling","Instruction selection and machine code generation","Branch prediction effects on compiled control flow","Cache effects of instruction layout and code locality"],
    cpp:["Lexer and tokenizer implementation","Recursive descent parser","Abstract Syntax Tree construction and traversal","Symbol table and lexical scope management","Bytecode instruction set design","Stack-based virtual machine execution"],
    projects:[
      {name:"Custom Programming Language", letter:"A", items:["Lexer (tokenizer) with error recovery","Recursive descent parser","AST generation","Tree-walking evaluator","Variables, first-class functions, closures","Control flow: if / while / for"]},
      {name:"Bytecode Virtual Machine", letter:"B", items:["Bytecode instruction set design","Stack machine execution loop","Memory management for objects","Mark-and-sweep garbage collector","Interactive REPL interface"]},
    ],
    pedagogy:["Show the full token stream → parse tree → AST pipeline","Trace a function call through the VM execution stack","Implement each compiler phase as a standalone testable pass","Connect lambda calculus reductions to actual language semantics"],
    checklist:{
      theory:["Prove a grammar is ambiguous or unambiguous","Convert an NFA to a DFA via subset construction","Explain LL(1) vs LR(1) parsing and their trade-offs","Derive type inference rules for a simple polymorphic type system"],
      programming:["Write a complete lexer for a C-like language","Implement a Pratt parser for operator precedence","Build a mark-and-sweep garbage collector","Implement tail-call optimization in the VM"],
      engineering:["Add a standard library to your language","Implement REPL with readline-style line editing","Add error recovery and synchronization to your parser","Benchmark your interpreter against Python for a workload"],
    },
    challenges:["Implement Hindley-Milner type inference","Add coroutine support to your language","Write a compiler backend that emits real x86-64 assembly","Implement a tracing JIT compiler"],
  },
  {
    id:7, title:"Databases, Storage Engines & Performance Engineering", shortTitle:"Databases",
    color:"#42F5C8", darkColor:"#002820", icon:"⊕", tagline:"Data outlives code — store it right",
    difficulty:"Advanced", weeks:"8–10 weeks",
    math:["B-Tree structural invariants and height proofs","Relational algebra: select, project, join, union, difference","Transaction serializability theory","MVCC and snapshot isolation mathematics","Write-ahead logging correctness proofs","Index selectivity statistics and cardinality estimation"],
    hardware:["Disk I/O: seeks, rotational latency, sequential reads","SSD internals: NAND, wear leveling, write amplification","Buffer pool and OS page cache interaction","fsync vs fdatasync durability guarantees","NUMA topology effects on concurrent DB workloads"],
    cpp:["B+-Tree with page-level management","Write-ahead log (WAL) implementation","Buffer pool manager with LRU eviction","SQL tokenizer and recursive descent parser","MVCC transaction management with timestamps","Profiling: perf, flamegraph, cachegrind"],
    projects:[
      {name:"Mini Relational Database", letter:"A", items:["SQL parser: SELECT / INSERT / UPDATE / DELETE","B+-Tree index engine","Buffer pool manager","WAL for crash recovery","MVCC transaction isolation","Query executor with joins"]},
      {name:"Performance Profiler", letter:"B", items:["Timing instrumentation with RDTSC","Memory allocation tracker","Flamegraph output generation","Cache miss counter via perf_events","Visual performance dashboard"]},
    ],
    pedagogy:["Trace a SQL query through parser → planner → executor → storage","Animate B-Tree split and merge with page-level diagrams","Demonstrate ACID violations when locking is missing","Profile the same query before and after creating an index"],
    checklist:{
      theory:["Prove B-Tree height is O(log n)","Derive 2PL serializability from the conflict serialization graph","Explain MVCC vs locking trade-offs thoroughly","Prove WAL is sufficient for crash recovery"],
      programming:["Implement B+-Tree with full delete and page merge","Write a WAL implementation with checkpointing","Build a buffer pool with LRU and clock eviction","Implement MVCC with timestamp ordering"],
      engineering:["Benchmark sequential vs random I/O on your database","Add a cost-based query planner with statistics","Implement a columnar (PAX) storage format","Build synchronous replication for your database"],
    },
    challenges:["Implement LSM-tree (Log-Structured Merge-tree) storage engine","Add proper snapshot isolation to your MVCC engine","Build a vectorized query executor using SIMD","Prove your WAL implementation is crash-consistent under all failure modes"],
  },
  {
    id:8, title:"Security, Cryptography & Advanced Systems", shortTitle:"Security",
    color:"#F55442", darkColor:"#280a00", icon:"⚿", tagline:"The attacker reads your code — so should you",
    difficulty:"Expert", weeks:"8–10 weeks",
    math:["Modular arithmetic and finite fields (GF(2^n))","Group theory foundations for elliptic curve cryptography","RSA: Euler's theorem and key generation mathematics","SHA-256 and cryptographic hash function properties","Information-theoretic security and perfect secrecy","Formal security proofs via reduction arguments"],
    hardware:["CPU speculative execution: Spectre and Meltdown","Hardware Security Modules (HSM) and secure enclaves","Intel SGX trusted execution environments","Side-channel attacks: timing, cache, power analysis","ASLR, stack canaries, NX/DEP bits at hardware level"],
    cpp:["Buffer overflow exploitation mechanics and prevention","Stack smashing: return address overwrite","Heap corruption: use-after-free, double-free","Compiler mitigations: ASLR, PIE, stack canaries in GCC","Secure coding patterns and defensive programming","OpenSSL: AES-256-GCM, RSA, ECDH, SHA-256"],
    projects:[
      {name:"Secure File Encryption Tool", letter:"A", items:["AES-256-GCM authenticated encryption","PBKDF2 password-based key derivation","HMAC-SHA256 message authentication","Secure memory zeroing on exit","Full CLI interface"]},
      {name:"Memory Vulnerability Demonstrator", letter:"B", items:["Controlled buffer overflow demo","Stack canary bypass analysis","Heap corruption case studies","ASLR effectiveness measurement","Mitigation comparison matrix"]},
    ],
    pedagogy:["Demonstrate a live stack overflow exploit in a controlled lab","Derive RSA key generation step by step from Euler's theorem","Show how ASLR defeats naive return-to-libc attacks","Implement AES-128 by hand to understand SubBytes, MixColumns"],
    checklist:{
      theory:["Derive RSA correctness from Euler's theorem","Informally prove SHA-256 preimage resistance","Explain why buffer overflows work at the assembly level","Describe all 4 Coffman conditions in a security context"],
      programming:["Implement AES-128 encryption from scratch in C","Write a secure memory allocator with guard pages","Build a constant-time string comparison function","Implement Diffie-Hellman key exchange"],
      engineering:["Audit a real C codebase for CVE-class vulnerabilities","Set up AddressSanitizer and UBSan on a project","Build a coverage-guided fuzzer for your HTTP parser","Harden the shell from Phase 4 against command injection"],
    },
    challenges:["Implement elliptic curve Diffie-Hellman (ECDH) from scratch","Write a ROP chain proof-of-concept in a controlled lab environment","Implement constant-time comparison and verify with timing analysis","Build a fuzzer that discovers a real bug in an open-source C project"],
  },
];

const capstoneProjects = [
  {name:"Miniature Operating System", desc:"Boot sequence, memory management, task scheduler, interrupt handling, shell support", icon:"⚙", color:"#F542A7"},
  {name:"Programming Language", desc:"Full compiler/interpreter with standard library, garbage collector, and REPL", icon:"λ", color:"#F5E242"},
  {name:"Distributed Database", desc:"SQL parsing, B+-Tree storage, Raft consensus protocol, multi-node replication", icon:"⊕", color:"#42F5C8"},
  {name:"Multiplayer Network Engine", desc:"UDP game protocol, lag compensation, client prediction, authoritative server", icon:"⇌", color:"#A742F5"},
  {name:"Software Renderer", desc:"Rasterizer, z-buffer, texture mapping, Phong lighting — zero GPU APIs", icon:"◈", color:"#42C8F5"},
  {name:"Compiler Toolchain", desc:"Lexer → parser → IR optimizer → x86-64 code generator → linker", icon:"▶", color:"#F5A742"},
  {name:"Container Runtime", desc:"Linux namespaces, cgroups, overlay filesystem, OCI image spec", icon:"□", color:"#C8F542"},
  {name:"CPU Emulator", desc:"Complete RISC-V emulator with full ISA, memory model, and peripheral support", icon:"∷", color:"#F55442"},
];

const difficultyMeta = {
  "Foundations": { color:"#C8F542", bg:"#1c2800" },
  "Intermediate": { color:"#42C8F5", bg:"#001c26" },
  "Advanced":    { color:"#F5A742", bg:"#251700" },
  "Expert":      { color:"#F55442", bg:"#280a00" },
};

const tagColors = {
  "MIT OCW":"#42C8F5","CMU":"#F55442","Stanford":"#F5E242","Coursera":"#A742F5",
  "Berkeley":"#F5A742","Harvard":"#42C8F5","Khan":"#42F5C8","Codecademy":"#A742F5",
  "Free Book":"#C8F542","Free":"#C8F542","Free Labs":"#C8F542","Free Notes":"#C8F542",
  "Free Paper":"#C8F542","Free Sample":"#C8F542","Free Chapters":"#C8F542","Free OS":"#C8F542",
  "YouTube":"#F55442","MIT":"#42C8F5","Cornell":"#F5E242","Udacity":"#42C8F5",
  "Practice":"#aaa","Visual":"#aaa","Interactive":"#aaa","Blog":"#aaa",
  "Tutorial":"#F5A742","GitHub":"#aaa","GitHub Labs":"#F5A742","Labs":"#F5A742",
  "Open Source":"#aaa","Textbook":"#777","Classic":"#777","CTF":"#F55442",
  "Book/Course":"#A742F5","Competitive":"#F55442","Reference":"#aaa","Exercise":"#aaa",
};

/* ════════════════════════════════════════════════════════
   HOOKS
════════════════════════════════════════════════════════ */
function useWindowSize() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1400);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

/* ════════════════════════════════════════════════════════
   STAR RATING
════════════════════════════════════════════════════════ */
function Stars({ n, color }) {
  return (
    <span style={{ letterSpacing:"2px", fontSize:"12px" }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i<=n ? color : "#2a2a2a" }}>★</span>
      ))}
    </span>
  );
}

/* ════════════════════════════════════════════════════════
   RESOURCE CARD
════════════════════════════════════════════════════════ */
function ResourceCard({ item, accent }) {
  const tc = tagColors[item.tag] || "#666";
  const [hov, setHov] = useState(false);
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", flexDirection:"column", gap:"10px",
        padding:"16px 18px",
        background: hov ? "#131313" : "#0d0d0d",
        border:`1px solid ${hov ? accent+"66" : "#1e1e1e"}`,
        borderRadius:"10px", textDecoration:"none",
        transition:"all 0.18s", cursor:"pointer",
      }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"12px" }}>
        <span style={{ fontSize:"14px", color: hov ? "#fff" : "#ddd", lineHeight:"1.5", flex:1, fontWeight:"500" }}>
          {item.name}
        </span>
        <span style={{
          fontSize:"10px", padding:"3px 8px", borderRadius:"4px", flexShrink:0,
          background: tc+"18", color: tc, border:`1px solid ${tc}33`,
          whiteSpace:"nowrap", fontWeight:"600", letterSpacing:"0.04em",
        }}>
          {item.tag}
        </span>
      </div>
      {item.stars && <Stars n={item.stars} color={accent} />}
    </a>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION LABEL
════════════════════════════════════════════════════════ */
function SectionLabel({ children, color }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:"10px", marginBottom:"18px",
    }}>
      <div style={{ width:"4px", height:"18px", borderRadius:"2px", background:color, flexShrink:0 }} />
      <span style={{ fontSize:"11px", color, letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:"700" }}>
        {children}
      </span>
      <div style={{ flex:1, height:"1px", background:"#1a1a1a" }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   TOPIC ITEM
════════════════════════════════════════════════════════ */
function TopicItem({ text, color }) {
  return (
    <div style={{
      display:"flex", gap:"14px", alignItems:"flex-start",
      padding:"12px 0", borderBottom:"1px solid #141414",
    }}>
      <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:color, flexShrink:0, marginTop:"8px" }} />
      <span style={{ fontSize:"15px", color:"#c8c8c8", lineHeight:"1.6" }}>{text}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CODE BLOCK
════════════════════════════════════════════════════════ */
function CodeBlock({ children, color, title }) {
  return (
    <div style={{ marginTop:"24px" }}>
      {title && (
        <div style={{ fontSize:"11px", color:"#444", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"8px" }}>
          {title}
        </div>
      )}
      <pre style={{
        background:"#060606", border:`1px solid #1a1a1a`,
        borderLeft:`3px solid ${color}`, borderRadius:"0 10px 10px 0",
        padding:"22px 26px", fontSize:"13px", color:"#666",
        lineHeight:"2", overflowX:"auto", margin:0,
        fontFamily:"'Courier New', Menlo, monospace",
      }}>
        {children}
      </pre>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MASTERY CHECK ITEM
════════════════════════════════════════════════════════ */
function CheckItem({ text, checked, accent, darkColor, onToggle }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onToggle}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", gap:"14px", alignItems:"flex-start",
        padding:"14px 16px", marginBottom:"8px",
        background: checked ? darkColor : (hov ? "#111" : "#0d0d0d"),
        border:`1px solid ${checked ? accent+"55" : (hov ? "#2a2a2a" : "#1a1a1a")}`,
        borderRadius:"8px", cursor:"pointer", transition:"all 0.16s",
      }}>
      <div style={{
        width:"20px", height:"20px", borderRadius:"5px", flexShrink:0, marginTop:"2px",
        border:`2px solid ${checked ? accent : "#2a2a2a"}`,
        background: checked ? accent : "transparent",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"11px", color:"#000", fontWeight:"bold", transition:"all 0.16s",
      }}>
        {checked ? "✓" : ""}
      </div>
      <span style={{
        fontSize:"15px", color: checked ? "#666" : "#ccc",
        textDecoration: checked ? "line-through" : "none",
        lineHeight:"1.6",
      }}>
        {text}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN APP
════════════════════════════════════════════════════════ */
export default function App() {
  const width = useWindowSize();
  const isMobile  = width < 768;
  const isTablet  = width >= 768 && width < 1120;

  const [landing,       setLanding]       = useState(true);
  const [activePhase,   setActivePhase]   = useState(0);
  const [activeTab,     setActiveTab]     = useState("overview");
  const [checkedItems,  setCheckedItems]  = useState({});
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [showCapstone,  setShowCapstone]  = useState(false);
  const [resFilter,     setResFilter]     = useState("all");
  const contentRef = useRef(null);

  const phase = phases[activePhase];
  const resources = resourcesByPhase[phase.id];

  const totalPossible = phases.reduce((a,p) =>
    a + p.checklist.theory.length + p.checklist.programming.length + p.checklist.engineering.length, 0);
  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const pct = Math.round((totalChecked/totalPossible)*100);

  const phaseProgress = (idx) => {
    const p = phases[idx]; let n = 0;
    ["theory","programming","engineering"].forEach(s =>
      p.checklist[s].forEach(item => { if (checkedItems[`${p.id}-${s}-${item}`]) n++; }));
    return { done:n, total: p.checklist.theory.length+p.checklist.programming.length+p.checklist.engineering.length };
  };

  const toggle = (key) => setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));

  const goPhase = (i) => {
    setActivePhase(i); setActiveTab("overview"); setResFilter("all");
    setSidebarOpen(false); setShowCapstone(false); setLanding(false);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  const allRes = resources ? [
    ...resources.courses.map(r=>({...r,cat:"Courses"})),
    ...resources.books.map(r=>({...r,cat:"Books & Texts"})),
    ...resources.practice.map(r=>({...r,cat:"Practice"})),
    ...resources.videos.map(r=>({...r,cat:"Videos"})),
  ] : [];

  const filteredRes = resFilter==="all" ? allRes : allRes.filter(r=>r.cat===resFilter);

  const tabs = [
    {id:"overview",  label:"Overview",   icon:"◉"},
    {id:"resources", label:"Resources",  icon:"⬡"},
    {id:"math",      label:"Math",       icon:"∑"},
    {id:"systems",   label:"Systems",    icon:"▣"},
    {id:"projects",  label:"Projects",   icon:"◈"},
    {id:"mastery",   label:"Mastery",    icon:"✓"},
    {id:"challenges",label:"Challenges", icon:"★"},
  ];

  /* ── LANDING PAGE ── */
  if (landing) {
    return (
      <div style={{
        minHeight:"100vh", background:"#080808",
        fontFamily:"'Courier New', Menlo, monospace",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding: isMobile ? "32px 20px" : "60px 40px",
        position:"relative", overflow:"hidden",
      }}>
        <style>{`
          * { box-sizing:border-box; }
          @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
          @keyframes glow { 0%,100%{opacity:0.4} 50%{opacity:1} }
          @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        `}</style>

        {/* bg grid */}
        <div style={{
          position:"absolute", inset:0, zIndex:0,
          backgroundImage:"linear-gradient(#1a1a1a 1px,transparent 1px),linear-gradient(90deg,#1a1a1a 1px,transparent 1px)",
          backgroundSize:"60px 60px", opacity:0.3,
        }}/>

        {/* corner accent */}
        <div style={{
          position:"absolute", top:"-80px", right:"-80px",
          width:"300px", height:"300px", borderRadius:"50%",
          background:"radial-gradient(circle, #C8F54222, transparent 70%)",
          zIndex:0,
        }}/>
        <div style={{
          position:"absolute", bottom:"-80px", left:"-80px",
          width:"260px", height:"260px", borderRadius:"50%",
          background:"radial-gradient(circle, #42C8F522, transparent 70%)",
          zIndex:0,
        }}/>

        <div style={{ position:"relative", zIndex:1, maxWidth:"860px", width:"100%", textAlign:"center" }}>

          {/* Author badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"10px",
            padding:"8px 20px", borderRadius:"100px",
            background:"#0f0f0f", border:"1px solid #2a2a2a",
            marginBottom:"36px",
            animation:"fadeUp 0.5s ease both",
          }}>
            <div style={{
              width:"28px", height:"28px", borderRadius:"50%",
              background:"linear-gradient(135deg, #C8F542, #42C8F5)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"13px", fontWeight:"bold", color:"#000",
            }}>N</div>
            <span style={{ fontSize:"13px", color:"#888", letterSpacing:"0.06em" }}>by</span>
            <span style={{ fontSize:"14px", color:"#C8F542", fontWeight:"700", letterSpacing:"0.08em" }}>nexuscodex</span>
          </div>

          {/* Title */}
          <div style={{ animation:"fadeUp 0.5s 0.1s ease both" }}>
            <div style={{
              fontSize: isMobile ? "38px" : "72px",
              fontWeight:"900", color:"#ffffff",
              letterSpacing:"-0.04em", lineHeight:"1.05",
              marginBottom:"8px",
            }}>
              Build-Everything
            </div>
            <div style={{
              fontSize: isMobile ? "38px" : "72px",
              fontWeight:"900", letterSpacing:"-0.04em", lineHeight:"1.05",
              background:"linear-gradient(90deg, #C8F542, #42C8F5, #A742F5)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              marginBottom:"32px",
            }}>
              CS Curriculum
            </div>
          </div>

          {/* Subtitle */}
          <div style={{ animation:"fadeUp 0.5s 0.2s ease both", marginBottom:"48px" }}>
            <p style={{
              fontSize: isMobile ? "16px" : "20px",
              color:"#888", lineHeight:"1.7", margin:"0 auto",
              maxWidth:"620px",
            }}>
              A university-grade, systems-level computer science curriculum.
              From transistor logic to distributed systems — built entirely from scratch.
            </p>
          </div>

          {/* University row */}
          <div style={{
            display:"flex", flexWrap:"wrap", gap:"10px",
            justifyContent:"center", marginBottom:"52px",
            animation:"fadeUp 0.5s 0.3s ease both",
          }}>
            {["MIT","Harvard","CMU","Stanford","UC Berkeley","ETH Zürich"].map(u => (
              <span key={u} style={{
                padding:"6px 16px", borderRadius:"100px",
                background:"#111", border:"1px solid #222",
                fontSize:"12px", color:"#666", letterSpacing:"0.06em",
              }}>{u}</span>
            ))}
          </div>

          {/* Stats row */}
          <div style={{
            display:"grid",
            gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
            gap:"12px", marginBottom:"52px",
            animation:"fadeUp 0.5s 0.35s ease both",
          }}>
            {[["8","Phases"],["60+","Weeks"],["16+","Projects"],["100+","Resources"]].map(([n,l]) => (
              <div key={l} style={{
                background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:"12px",
                padding:"20px 16px", textAlign:"center",
              }}>
                <div style={{ fontSize: isMobile?"28px":"36px", fontWeight:"800", color:"#fff", letterSpacing:"-0.03em" }}>{n}</div>
                <div style={{ fontSize:"12px", color:"#555", marginTop:"4px", letterSpacing:"0.08em", textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Phase chips */}
          <div style={{
            display:"flex", flexWrap:"wrap", gap:"10px", justifyContent:"center",
            marginBottom:"52px", animation:"fadeUp 0.5s 0.4s ease both",
          }}>
            {phases.map(p => (
              <button key={p.id} onClick={() => goPhase(p.id-1)} style={{
                display:"flex", alignItems:"center", gap:"8px",
                padding:"10px 18px", borderRadius:"100px",
                background:"#0d0d0d", border:`1px solid #1e1e1e`,
                color:"#888", cursor:"pointer", fontFamily:"inherit",
                fontSize:"13px", transition:"all 0.18s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=p.color+"88";e.currentTarget.style.color="#fff";e.currentTarget.style.background="#111";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#1e1e1e";e.currentTarget.style.color="#888";e.currentTarget.style.background="#0d0d0d";}}
              >
                <span style={{ fontSize:"14px", color:p.color }}>{p.icon}</span>
                {p.shortTitle}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div style={{ animation:"fadeUp 0.5s 0.45s ease both" }}>
            <button onClick={() => goPhase(0)} style={{
              padding:"18px 48px", borderRadius:"12px",
              background:"linear-gradient(135deg,#C8F542,#42C8F5)",
              border:"none", color:"#000", fontWeight:"800",
              fontSize:"16px", fontFamily:"inherit", cursor:"pointer",
              letterSpacing:"0.04em", transition:"all 0.2s",
              boxShadow:"0 0 40px #C8F54244",
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 48px #C8F54266";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 0 40px #C8F54244";}}>
              Start Phase 1 →
            </button>
          </div>

        </div>
      </div>
    );
  }

  /* ── MAIN APP ── */
  return (
    <div style={{
      minHeight:"100vh", background:"#080808",
      fontFamily:"'Courier New', Menlo, monospace",
      color:"#e0e0e0", display:"flex", flexDirection:"column",
    }}>
      <style>{`
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:#0a0a0a; }
        ::-webkit-scrollbar-thumb { background:#222; border-radius:3px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .phasebtn:hover { background:#111 !important; }
        .tab-btn:hover { color:#fff !important; }
        .filter-btn:hover { opacity:1 !important; }
      `}</style>

      {/* ══ TOP BAR ══ */}
      <header style={{
        position:"sticky", top:0, zIndex:200,
        background:"rgba(8,8,8,0.96)", backdropFilter:"blur(20px)",
        borderBottom:"1px solid #161616",
        padding: isMobile ? "12px 16px" : "14px 32px",
        display:"flex", alignItems:"center", gap:"12px",
      }}>
        {isMobile && (
          <button onClick={() => setSidebarOpen(v=>!v)} style={{
            background: sidebarOpen ? "#161616" : "transparent",
            border:"1px solid #222", borderRadius:"6px",
            color:"#888", cursor:"pointer", padding:"8px 10px",
            fontSize:"14px", lineHeight:1, flexShrink:0,
          }}>
            {sidebarOpen ? "✕" : "☰"}
          </button>
        )}

        {/* Logo / title — click to return to landing */}
        <button onClick={() => setLanding(true)} style={{
          background:"transparent", border:"none", cursor:"pointer",
          display:"flex", alignItems:"center", gap:"10px", padding:0, flexShrink:0,
        }}>
          <div style={{
            width:"32px", height:"32px", borderRadius:"8px",
            background:"linear-gradient(135deg,#C8F542,#42C8F5)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"15px", fontWeight:"900", color:"#000",
          }}>N</div>
          {!isMobile && (
            <div style={{ textAlign:"left" }}>
              <div style={{ fontSize:"10px", color:"#444", letterSpacing:"0.15em", textTransform:"uppercase" }}>nexuscodex</div>
              <div style={{ fontSize:"14px", color:"#fff", fontWeight:"700", letterSpacing:"-0.01em" }}>Build-Everything CS</div>
            </div>
          )}
        </button>

        <div style={{ flex:1 }} />

        {/* Global progress */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", flexShrink:0 }}>
          {!isMobile && <span style={{ fontSize:"11px", color:"#444", letterSpacing:"0.1em" }}>PROGRESS</span>}
          <div style={{ position:"relative", width: isMobile?"60px":"120px", height:"4px", background:"#161616", borderRadius:"2px" }}>
            <div style={{
              position:"absolute", left:0, top:0, height:"100%",
              width:`${pct}%`, borderRadius:"2px",
              background:`linear-gradient(90deg, #C8F542, #42C8F5)`,
              transition:"width 0.5s ease",
            }}/>
          </div>
          <span style={{ fontSize:"13px", color:"#C8F542", fontWeight:"700", minWidth:"36px" }}>{pct}%</span>
        </div>

        <button onClick={() => { setShowCapstone(v=>!v); setSidebarOpen(false); }} style={{
          background: showCapstone ? "#C8F542" : "transparent",
          border:`1px solid ${showCapstone?"#C8F542":"#222"}`,
          borderRadius:"8px", color: showCapstone?"#000":"#666",
          cursor:"pointer", padding: isMobile?"6px 10px":"8px 16px",
          fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase",
          fontFamily:"inherit", fontWeight:"700", flexShrink:0, transition:"all 0.18s",
        }}>
          {isMobile ? "⬟" : "Capstone"}
        </button>
      </header>

      <div style={{ flex:1, display:"flex", overflow:"hidden", position:"relative" }}>

        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} style={{
            position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:150,
          }}/>
        )}

        {/* ══ SIDEBAR ══ */}
        <aside style={{
          width: isMobile?"290px" : isTablet?"210px" : "270px",
          flexShrink:0, borderRight:"1px solid #111",
          overflowY:"auto", background:"#070707",
          ...(isMobile ? {
            position:"fixed", top:0, left:0, bottom:0, zIndex:160, paddingTop:"68px",
            transform: sidebarOpen?"translateX(0)":"translateX(-100%)",
            transition:"transform 0.22s cubic-bezier(.4,0,.2,1)",
          } : {}),
        }}>
          <div style={{ padding:"16px 20px 10px", fontSize:"10px", color:"#2e2e2e", letterSpacing:"0.18em", textTransform:"uppercase" }}>
            8 Phases · ~60 weeks total
          </div>

          {phases.map((p,i) => {
            const { done, total } = phaseProgress(i);
            const active = activePhase===i && !showCapstone;
            return (
              <button key={p.id} className="phasebtn" onClick={() => goPhase(i)} style={{
                display:"flex", alignItems:"center", gap:"12px",
                width:"100%", padding:"12px 18px",
                background: active?"#111":"transparent",
                border:"none", borderLeft:`3px solid ${active ? p.color : "transparent"}`,
                cursor:"pointer", textAlign:"left", transition:"all 0.12s",
              }}>
                <div style={{
                  width:"36px", height:"36px", borderRadius:"8px", flexShrink:0,
                  background: active ? p.color : "#111",
                  border:`1px solid ${active ? p.color : "#1e1e1e"}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"16px", color: active?"#000":p.color, fontWeight:"bold",
                  transition:"all 0.12s",
                }}>{p.icon}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"3px" }}>
                    <span style={{ fontSize:"10px", color: active?"#666":"#2e2e2e", letterSpacing:"0.08em" }}>
                      {p.difficulty.toUpperCase()}
                    </span>
                    <span style={{ fontSize:"10px", color: done>0 ? p.color : "#2e2e2e" }}>{done}/{total}</span>
                  </div>
                  <div style={{
                    fontSize:"13px", color: active?"#fff":"#666",
                    fontWeight: active?"700":"400",
                    whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
                  }}>{p.shortTitle}</div>
                  <div style={{ marginTop:"5px", height:"2px", background:"#161616", borderRadius:"1px" }}>
                    <div style={{ height:"100%", width:`${(done/total)*100}%`, background:p.color, borderRadius:"1px", transition:"width 0.4s" }}/>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Sidebar footer — author */}
          <div style={{ margin:"16px 18px", padding:"16px", background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:"10px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
              <div style={{
                width:"32px", height:"32px", borderRadius:"50%",
                background:"linear-gradient(135deg,#C8F542,#42C8F5)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"14px", fontWeight:"900", color:"#000",
              }}>N</div>
              <div>
                <div style={{ fontSize:"13px", color:"#C8F542", fontWeight:"700" }}>nexuscodex</div>
                <div style={{ fontSize:"10px", color:"#444" }}>Curriculum Author</div>
              </div>
            </div>
            {[["Completed",`${totalChecked}/${totalPossible}`,"#C8F542"],
              ["Phases",`${phases.filter((_,i)=>{const{done,total}=phaseProgress(i);return done===total&&total>0;}).length}/8`,"#888"],
              ["Mastery",`${pct}%`, pct>50?"#C8F542":"#888"],
            ].map(([label,val,color]) => (
              <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #131313" }}>
                <span style={{ fontSize:"11px", color:"#444" }}>{label}</span>
                <span style={{ fontSize:"11px", color, fontWeight:"600" }}>{val}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ══ MAIN ══ */}
        <main ref={contentRef} style={{ flex:1, overflowY:"auto", minWidth:0 }}>

          {/* ── CAPSTONE ── */}
          {showCapstone && (
            <div style={{ animation:"fadeUp 0.25s ease", padding: isMobile?"24px 18px":"40px 56px", maxWidth:"1200px" }}>
              <div style={{ marginBottom:"36px" }}>
                <div style={{ fontSize:"11px", color:"#444", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"8px" }}>
                  nexuscodex · Final Milestone
                </div>
                <h1 style={{ fontSize: isMobile?"26px":"40px", fontWeight:"900", color:"#fff", letterSpacing:"-0.03em", margin:"0 0 12px" }}>
                  Capstone Systems Projects
                </h1>
                <p style={{ fontSize:"16px", color:"#666", lineHeight:"1.7", maxWidth:"600px", margin:0 }}>
                  After completing all 8 phases, you will undertake a large-scale engineering project spanning multiple domains. These are not tutorials — these are systems built from scratch.
                </p>
              </div>

              <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:"18px", marginBottom:"44px" }}>
                {capstoneProjects.map(c => (
                  <div key={c.name} style={{
                    background:"#0d0d0d", border:"1px solid #1a1a1a",
                    borderTop:`3px solid ${c.color}`, borderRadius:"12px", padding:"22px 24px",
                    transition:"transform 0.18s",
                  }}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
                  >
                    <div style={{ display:"flex", gap:"14px", alignItems:"flex-start" }}>
                      <div style={{
                        width:"44px", height:"44px", borderRadius:"10px", flexShrink:0,
                        background:c.color+"18", border:`1px solid ${c.color}30`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:"20px", color:c.color,
                      }}>{c.icon}</div>
                      <div>
                        <div style={{ fontSize:"17px", color:"#fff", fontWeight:"700", marginBottom:"6px" }}>{c.name}</div>
                        <div style={{ fontSize:"14px", color:"#666", lineHeight:"1.6" }}>{c.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:"12px", padding:"28px 32px" }}>
                <SectionLabel color="#C8F542">Graduate Capabilities</SectionLabel>
                <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:"0" }}>
                  {[
                    "Read operating system source code fluently",
                    "Implement advanced algorithms from research papers",
                    "Understand memory at the hardware level",
                    "Build scalable distributed systems",
                    "Understand compilers from first principles",
                    "Write efficient low-level software in C",
                    "Reason mathematically about computation",
                    "Design professional software architecture",
                    "Debug complex systems-level problems",
                    "Trace computation from transistor to distributed network",
                  ].map(cap => (
                    <div key={cap} style={{ display:"flex", gap:"12px", alignItems:"flex-start", padding:"10px 0", borderBottom:"1px solid #131313" }}>
                      <span style={{ color:"#C8F542", flexShrink:0, marginTop:"3px" }}>✓</span>
                      <span style={{ fontSize:"15px", color:"#999" }}>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PHASE VIEW ── */}
          {!showCapstone && (
            <div style={{ animation:"fadeUp 0.2s ease" }}>

              {/* Phase banner */}
              <div style={{
                padding: isMobile?"20px 18px 0":"32px 56px 0",
                background:"#090909", borderBottom:"1px solid #111",
              }}>
                {/* Author line */}
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"16px" }}>
                  <div style={{
                    width:"22px", height:"22px", borderRadius:"50%",
                    background:"linear-gradient(135deg,#C8F542,#42C8F5)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"11px", fontWeight:"900", color:"#000",
                  }}>N</div>
                  <span style={{ fontSize:"11px", color:"#444" }}>nexuscodex</span>
                  <span style={{ fontSize:"11px", color:"#2a2a2a" }}>·</span>
                  <span style={{ fontSize:"11px", color:"#2a2a2a" }}>Build-Everything CS Curriculum</span>
                </div>

                <div style={{ display:"flex", alignItems:"flex-start", gap:"16px", marginBottom:"18px" }}>
                  <div style={{
                    width: isMobile?"52px":"64px", height: isMobile?"52px":"64px",
                    borderRadius:"14px", background:phase.color, flexShrink:0,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize: isMobile?"22px":"28px", color:"#000", fontWeight:"900",
                    boxShadow:`0 0 32px ${phase.color}44`,
                  }}>{phase.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap", marginBottom:"6px" }}>
                      <span style={{
                        fontSize:"11px", padding:"3px 10px", borderRadius:"100px",
                        background: difficultyMeta[phase.difficulty].bg,
                        color: difficultyMeta[phase.difficulty].color,
                        border:`1px solid ${difficultyMeta[phase.difficulty].color}33`,
                        fontWeight:"700", letterSpacing:"0.08em",
                      }}>{phase.difficulty.toUpperCase()}</span>
                      <span style={{ fontSize:"12px", color:"#333" }}>Phase {phase.id} of 8</span>
                      <span style={{ fontSize:"12px", color:"#333" }}>·</span>
                      <span style={{ fontSize:"12px", color:"#333" }}>{phase.weeks}</span>
                    </div>
                    <h1 style={{
                      fontSize: isMobile?"20px":"30px", fontWeight:"800", color:"#fff",
                      letterSpacing:"-0.03em", lineHeight:"1.2", margin:"0 0 6px",
                    }}>
                      {isMobile ? phase.shortTitle : phase.title}
                    </h1>
                    <p style={{ fontSize:"15px", color:phase.color, fontStyle:"italic", margin:0, opacity:0.9 }}>
                      "{phase.tagline}"
                    </p>
                  </div>
                </div>

                {/* Phase progress bar */}
                <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"20px" }}>
                  <div style={{ flex:1, height:"4px", background:"#141414", borderRadius:"2px" }}>
                    <div style={{
                      height:"100%", borderRadius:"2px",
                      width:`${(phaseProgress(activePhase).done / phaseProgress(activePhase).total)*100}%`,
                      background:`linear-gradient(90deg,${phase.color},${phase.color}88)`,
                      transition:"width 0.5s ease",
                    }}/>
                  </div>
                  <span style={{ fontSize:"12px", color:phase.color, fontWeight:"600", flexShrink:0 }}>
                    {phaseProgress(activePhase).done} / {phaseProgress(activePhase).total} tasks
                  </span>
                </div>

                {/* Tabs */}
                <div style={{ display:"flex", overflowX:"auto", gap:0, scrollbarWidth:"none" }}>
                  {tabs.map(t => (
                    <button key={t.id} className="tab-btn" onClick={() => setActiveTab(t.id)} style={{
                      background:"transparent", border:"none", cursor:"pointer",
                      borderBottom: activeTab===t.id ? `3px solid ${phase.color}` : "3px solid transparent",
                      color: activeTab===t.id ? phase.color : "#555",
                      padding: isMobile?"10px 12px":"11px 20px",
                      fontSize: isMobile?"10px":"13px",
                      letterSpacing:"0.08em", textTransform:"uppercase",
                      fontFamily:"inherit", fontWeight: activeTab===t.id?"700":"400",
                      transition:"color 0.12s", whiteSpace:"nowrap",
                      position:"relative",
                    }}>
                      {isMobile ? t.icon : `${t.label}`}
                      {t.id==="resources" && (
                        <span style={{
                          position:"absolute", top:"8px", right: isMobile?"2px":"10px",
                          width:"6px", height:"6px", borderRadius:"50%", background:phase.color,
                        }}/>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab content */}
              <div style={{ padding: isMobile?"24px 18px":"36px 56px", maxWidth:"1200px" }}>

                {/* ── OVERVIEW ── */}
                {activeTab==="overview" && (
                  <div style={{ animation:"fadeUp 0.18s ease" }}>
                    {/* Stats */}
                    <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(4,1fr)", gap:"12px", marginBottom:"32px" }}>
                      {[
                        ["Math Topics", phase.math.length, "∑", "Theory"],
                        ["HW Topics",   phase.hardware.length, "⚙", "Hardware"],
                        ["C Topics",    phase.cpp.length, "C", "Code"],
                        ["Resources",   allRes.length, "⬡", "Free Links"],
                      ].map(([label,val,icon,sub]) => (
                        <div key={label} style={{
                          background:"#0d0d0d", border:"1px solid #1a1a1a",
                          borderTop:`3px solid ${phase.color}33`, borderRadius:"10px", padding:"18px 20px",
                        }}>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                            <span style={{ fontSize:"11px", color:"#444", textTransform:"uppercase", letterSpacing:"0.1em" }}>{label}</span>
                            <span style={{ fontSize:"18px", color:"#1e1e1e" }}>{icon}</span>
                          </div>
                          <div style={{ fontSize:"32px", fontWeight:"800", color:phase.color, lineHeight:1 }}>{val}</div>
                          <div style={{ fontSize:"11px", color:"#333", marginTop:"4px" }}>{sub}</div>
                        </div>
                      ))}
                    </div>

                    <SectionLabel color={phase.color}>8-Step Pedagogical Framework</SectionLabel>
                    <div style={{
                      display:"grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(4,1fr)",
                      gap:"1px", background:"#141414", border:"1px solid #141414",
                      borderRadius:"10px", overflow:"hidden", marginBottom:"32px",
                    }}>
                      {[
                        ["01","Intuitive",   "Plain-language first principles"],
                        ["02","Formal",      "Mathematical derivations"],
                        ["03","Hardware",    "CPU & memory interpretation"],
                        ["04","C Code",      "Compilable implementations"],
                        ["05","Execution",   "Line-by-line traces"],
                        ["06","Complexity",  "Formal O/Θ/Ω analysis"],
                        ["07","Debugging",   "Error methodology"],
                        ["08","Optimize",    "Performance engineering"],
                      ].map(([num,title,desc]) => (
                        <div key={num} style={{ background:"#0d0d0d", padding:"16px 18px" }}>
                          <div style={{ fontSize:"10px", color:phase.color, opacity:0.6, marginBottom:"4px", fontWeight:"700" }}>STEP {num}</div>
                          <div style={{ fontSize:"14px", color:"#e0e0e0", fontWeight:"700", marginBottom:"5px" }}>{title}</div>
                          <div style={{ fontSize:"12px", color:"#444", lineHeight:"1.5" }}>{desc}</div>
                        </div>
                      ))}
                    </div>

                    <SectionLabel color={phase.color}>Teaching Philosophy</SectionLabel>
                    <div style={{ marginBottom:"32px" }}>
                      {phase.pedagogy.map((note,i) => (
                        <div key={i} style={{
                          display:"flex", gap:"14px", alignItems:"flex-start",
                          padding:"14px 18px", marginBottom:"8px",
                          background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:"8px",
                        }}>
                          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:phase.color, flexShrink:0, marginTop:"10px" }}/>
                          <span style={{ fontSize:"15px", color:"#bbb", lineHeight:"1.7" }}>{note}</span>
                        </div>
                      ))}
                    </div>

                    <SectionLabel color={phase.color}>Jump to Phase</SectionLabel>
                    <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                      {phases.map((p,i) => (
                        <button key={p.id} onClick={() => goPhase(i)} style={{
                          display:"flex", alignItems:"center", gap:"8px",
                          padding:"8px 16px", borderRadius:"8px",
                          background: i===activePhase ? phase.color : "#0d0d0d",
                          border:`1px solid ${i===activePhase ? phase.color : "#1e1e1e"}`,
                          color: i===activePhase ? "#000" : "#777",
                          fontSize:"13px", fontFamily:"inherit", cursor:"pointer", transition:"all 0.12s",
                        }}>
                          <span>{p.icon}</span> {p.shortTitle}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── RESOURCES ── */}
                {activeTab==="resources" && (
                  <div style={{ animation:"fadeUp 0.18s ease" }}>
                    <div style={{ marginBottom:"24px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"8px" }}>
                        <h2 style={{ fontSize: isMobile?"20px":"26px", fontWeight:"800", color:"#fff", margin:0, letterSpacing:"-0.02em" }}>
                          Free Learning Resources
                        </h2>
                        <span style={{
                          fontSize:"12px", padding:"4px 12px", borderRadius:"100px",
                          background:phase.color+"20", color:phase.color, border:`1px solid ${phase.color}33`,
                          fontWeight:"700",
                        }}>
                          {allRes.length} links
                        </span>
                      </div>
                      <p style={{ fontSize:"15px", color:"#666", lineHeight:"1.6", margin:"0 0 20px" }}>
                        All resources are free or freely auditable. Click any card to open in a new tab.
                        Starred resources are the highest recommended for this phase.
                      </p>

                      {/* Filter pills */}
                      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                        {["all","Courses","Books & Texts","Practice","Videos"].map(f => {
                          const count = f==="all" ? allRes.length : allRes.filter(r=>r.cat===f).length;
                          const active = resFilter===f;
                          return (
                            <button key={f} className="filter-btn" onClick={() => setResFilter(f)} style={{
                              padding:"8px 18px", borderRadius:"100px",
                              background: active ? phase.color : "#0d0d0d",
                              border:`1px solid ${active ? phase.color : "#1e1e1e"}`,
                              color: active ? "#000" : "#777",
                              fontSize:"13px", letterSpacing:"0.04em",
                              fontFamily:"inherit", cursor:"pointer", transition:"all 0.15s",
                              fontWeight: active?"700":"400",
                              opacity: active ? 1 : 0.8,
                            }}>
                              {f==="all" ? "All" : f} <span style={{ opacity:0.6 }}>({count})</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {resFilter==="all" ? (
                      ["Courses","Books & Texts","Practice","Videos"].map(cat => {
                        const items = allRes.filter(r=>r.cat===cat);
                        if (!items.length) return null;
                        const catIcon = {"Courses":"▶","Books & Texts":"◫","Practice":"◆","Videos":"⬡"}[cat];
                        return (
                          <div key={cat} style={{ marginBottom:"32px" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
                              <span style={{ fontSize:"14px", color:phase.color }}>{catIcon}</span>
                              <span style={{ fontSize:"16px", color:"#ddd", fontWeight:"700" }}>{cat}</span>
                              <div style={{ flex:1, height:"1px", background:"#141414" }}/>
                              <span style={{ fontSize:"12px", color:"#333" }}>{items.length} items</span>
                            </div>
                            <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:"10px" }}>
                              {items.map((item,i) => <ResourceCard key={i} item={item} accent={phase.color}/>)}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:"10px" }}>
                        {filteredRes.map((item,i) => <ResourceCard key={i} item={item} accent={phase.color}/>)}
                      </div>
                    )}

                    {/* Universal resources */}
                    <div style={{ marginTop:"36px", padding:"24px 28px", background:"#0d0d0d", border:`1px solid ${phase.color}22`, borderRadius:"12px" }}>
                      <SectionLabel color={phase.color}>Universal Resources — All Phases</SectionLabel>
                      <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:"10px" }}>
                        {[
                          {name:"Teach Yourself CS — curated self-study roadmap", url:"https://teachyourselfcs.com/", tag:"Free"},
                          {name:"CS DIY Wiki — full self-taught CS degree guide", url:"https://csdiy.wiki/en/", tag:"Free"},
                          {name:"MIT OpenCourseWare — all MIT courses free", url:"https://ocw.mit.edu/", tag:"MIT OCW"},
                          {name:"GeeksforGeeks — comprehensive CS reference", url:"https://www.geeksforgeeks.org/", tag:"Practice"},
                          {name:"Class Central — free course catalog (1000+ CS)", url:"https://www.classcentral.com/", tag:"Free"},
                          {name:"The Missing Semester of Your CS Education (MIT)", url:"https://missing.csail.mit.edu/", tag:"MIT OCW"},
                        ].map((item,i) => <ResourceCard key={i} item={item} accent={phase.color}/>)}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── MATH ── */}
                {activeTab==="math" && (
                  <div style={{ animation:"fadeUp 0.18s ease" }}>
                    <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:"40px" }}>
                      <div>
                        <SectionLabel color={phase.color}>Mathematical Curriculum</SectionLabel>
                        {phase.math.map((t,i) => <TopicItem key={i} text={t} color={phase.color}/>)}
                      </div>
                      <div>
                        <SectionLabel color={phase.color}>Hardware Foundations</SectionLabel>
                        {phase.hardware.map((t,i) => <TopicItem key={i} text={t} color={phase.color}/>)}
                      </div>
                    </div>
                    <CodeBlock color={phase.color} title="Per-Concept Requirements">
{`FOR EACH mathematical concept in this phase:
  1. State the formal definition (mathematical notation)
  2. Prove from axioms where applicable
  3. Show a worked example computed entirely by hand
  4. Connect to hardware representation
  5. Connect to C language behavior
  6. Analyze computational complexity formally
  7. Identify all edge cases and failure modes`}
                    </CodeBlock>
                    <div style={{ marginTop:"32px" }}>
                      <SectionLabel color={phase.color}>Required Notation & Diagrams</SectionLabel>
                      <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(3,1fr)", gap:"10px" }}>
                        {["Truth tables","Binary walkthroughs","Formal proofs","Recurrence relations","Complexity derivations","ASCII memory diagrams","Stack frame diagrams","Recursion trees","Cache line layouts"].map(n => (
                          <div key={n} style={{
                            padding:"12px 16px", background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:"8px",
                            fontSize:"14px", color:"#888",
                          }}>
                            <span style={{ color:phase.color, marginRight:"10px" }}>◈</span>{n}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── SYSTEMS ── */}
                {activeTab==="systems" && (
                  <div style={{ animation:"fadeUp 0.18s ease" }}>
                    <SectionLabel color={phase.color}>C Systems Programming Topics</SectionLabel>
                    {phase.cpp.map((t,i) => <TopicItem key={i} text={t} color={phase.color}/>)}
                    <CodeBlock color={phase.color} title="Every C Implementation Must:">
{`/* Compilation: gcc -Wall -Wextra -O2 -g -fsanitize=address,undefined */

/* Each source file requires:
   ─ Comments on stack vs heap behavior per variable
   ─ Pointer ownership and lifetime annotations
   ─ Cache and performance implications noted
   ─ Common error modes with concrete examples
   ─ Memory safety checklist at the bottom

   Each example includes:
   ─ Step-by-step execution trace walkthrough
   ─ ASCII stack frame diagram showing all local vars
   ─ Heap allocation map at each malloc call
   ─ Formal Big-O complexity derivation
   ─ A dedicated debugging section with planted bugs */`}
                    </CodeBlock>
                    <div style={{ marginTop:"32px" }}>
                      <SectionLabel color={phase.color}>Required Diagrams Per Concept</SectionLabel>
                      <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(4,1fr)", gap:"10px" }}>
                        {["ASCII memory layout","Stack frame diagrams","Heap allocation maps","Pointer chain visuals","Recursion trees","Cache line diagrams","Register walkthroughs","Execution flow traces"].map(d => (
                          <div key={d} style={{
                            padding:"12px 16px", background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:"8px",
                            fontSize:"13px", color:"#888",
                          }}>
                            <span style={{ color:phase.color, marginRight:"10px" }}>▸</span>{d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── PROJECTS ── */}
                {activeTab==="projects" && (
                  <div style={{ animation:"fadeUp 0.18s ease" }}>
                    <SectionLabel color={phase.color}>Phase {phase.id} Build Projects</SectionLabel>
                    <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:"18px", marginBottom:"36px" }}>
                      {phase.projects.map(proj => (
                        <div key={proj.letter} style={{
                          background:"#0d0d0d", border:"1px solid #1a1a1a",
                          borderTop:`3px solid ${phase.color}`,
                          borderRadius:"12px", padding:"24px 26px",
                        }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"18px" }}>
                            <div style={{
                              width:"40px", height:"40px", borderRadius:"10px",
                              background:phase.color, display:"flex", alignItems:"center",
                              justifyContent:"center", color:"#000", fontWeight:"900", fontSize:"16px",
                            }}>{proj.letter}</div>
                            <div style={{ fontSize:"18px", color:"#fff", fontWeight:"700" }}>{proj.name}</div>
                          </div>
                          {proj.items.map(item => (
                            <div key={item} style={{
                              display:"flex", gap:"12px", alignItems:"flex-start",
                              padding:"9px 0", borderBottom:"1px solid #131313",
                              fontSize:"14px", color:"#888",
                            }}>
                              <span style={{ color:phase.color, flexShrink:0 }}>✓</span>{item}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <SectionLabel color={phase.color}>Capstone Scale Projects</SectionLabel>
                    <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:"12px" }}>
                      {capstoneProjects.map(c => (
                        <div key={c.name} style={{
                          display:"flex", gap:"14px", padding:"16px 18px",
                          background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:"10px",
                        }}>
                          <span style={{ fontSize:"20px", color:c.color, flexShrink:0 }}>{c.icon}</span>
                          <div>
                            <div style={{ fontSize:"15px", color:"#ddd", fontWeight:"700", marginBottom:"4px" }}>{c.name}</div>
                            <div style={{ fontSize:"13px", color:"#555" }}>{c.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── MASTERY ── */}
                {activeTab==="mastery" && (
                  <div style={{ animation:"fadeUp 0.18s ease" }}>
                    {/* Phase mastery header */}
                    <div style={{
                      display:"flex", gap:"16px", alignItems:"center",
                      padding:"20px 24px", background:"#0d0d0d",
                      border:`1px solid ${phase.color}28`, borderRadius:"12px", marginBottom:"28px",
                    }}>
                      <div style={{
                        width:"64px", height:"64px", borderRadius:"50%", flexShrink:0,
                        background:"#111", border:`3px solid ${phase.color}`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:"20px", fontWeight:"800", color:phase.color,
                      }}>
                        {Math.round((phaseProgress(activePhase).done/phaseProgress(activePhase).total)*100)}%
                      </div>
                      <div>
                        <div style={{ fontSize:"18px", color:"#fff", fontWeight:"700" }}>Phase {phase.id} Mastery Tracker</div>
                        <div style={{ fontSize:"14px", color:"#666", marginTop:"4px" }}>
                          {phaseProgress(activePhase).done} of {phaseProgress(activePhase).total} tasks completed — click any item to mark it done
                        </div>
                      </div>
                    </div>

                    {Object.entries(phase.checklist).map(([section,items]) => (
                      <div key={section} style={{ marginBottom:"32px" }}>
                        <SectionLabel color={phase.color}>
                          {section==="theory"?"Theory Mastery":section==="programming"?"Programming Mastery":"Engineering Mastery"}
                        </SectionLabel>
                        {items.map(item => {
                          const key = `${phase.id}-${section}-${item}`;
                          return (
                            <CheckItem
                              key={item} text={item}
                              checked={!!checkedItems[key]}
                              accent={phase.color}
                              darkColor={phase.darkColor}
                              onToggle={() => toggle(key)}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}

                {/* ── CHALLENGES ── */}
                {activeTab==="challenges" && (
                  <div style={{ animation:"fadeUp 0.18s ease" }}>
                    <SectionLabel color={phase.color}>Graduate-Level Challenge Problems</SectionLabel>
                    <div style={{ marginBottom:"36px" }}>
                      {phase.challenges.map((c,i) => (
                        <div key={i} style={{
                          padding:"20px 24px", marginBottom:"12px",
                          background:"#0d0d0d", border:"1px solid #1a1a1a",
                          borderLeft:`4px solid ${phase.color}`,
                          borderRadius:"0 10px 10px 0",
                        }}>
                          <div style={{ display:"flex", gap:"14px", alignItems:"flex-start" }}>
                            <div style={{
                              fontSize:"11px", color:phase.color,
                              background:phase.darkColor, border:`1px solid ${phase.color}44`,
                              borderRadius:"5px", padding:"3px 9px",
                              flexShrink:0, marginTop:"3px", fontWeight:"700",
                            }}>#{i+1}</div>
                            <span style={{ fontSize:"16px", color:"#ddd", lineHeight:"1.7" }}>{c}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <SectionLabel color={phase.color}>Mini Exam Format</SectionLabel>
                    <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:"12px", overflow:"hidden", marginBottom:"36px" }}>
                      {[
                        ["Written",   "Mathematical proofs and derivations — closed notes",     "45 min"],
                        ["Implement", "Write a complete working C program from scratch",         "90 min"],
                        ["Debug",     "Find and fix 5 planted bugs in provided source code",     "45 min"],
                        ["Optimize",  "Improve a provided solution by ≥2× measured speedup",    "60 min"],
                        ["Design",    "Architect a system that satisfies given constraints",     "30 min"],
                      ].map(([type,desc,time],i,arr) => (
                        <div key={type} style={{
                          display:"flex", alignItems:"center", padding:"16px 22px", gap:"16px",
                          borderBottom: i<arr.length-1?"1px solid #111":"none",
                        }}>
                          <div style={{
                            fontSize:"10px", color:"#000", background:phase.color,
                            borderRadius:"5px", padding:"4px 10px",
                            flexShrink:0, fontWeight:"800", letterSpacing:"0.06em",
                          }}>{type.toUpperCase()}</div>
                          <div style={{ flex:1, fontSize:"14px", color:"#999" }}>{desc}</div>
                          <div style={{ fontSize:"12px", color:"#444", flexShrink:0, fontWeight:"600" }}>{time}</div>
                        </div>
                      ))}
                    </div>

                    <SectionLabel color={phase.color}>All Phase Challenges — Quick Navigate</SectionLabel>
                    <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:"10px" }}>
                      {phases.map(p => (
                        <button key={p.id} onClick={() => goPhase(p.id-1)} style={{
                          background: p.id-1===activePhase ? p.color+"14" : "#0d0d0d",
                          border:`1px solid ${p.id-1===activePhase ? p.color+"44" : "#1a1a1a"}`,
                          borderRadius:"10px", padding:"14px 16px", cursor:"pointer",
                          textAlign:"left", fontFamily:"inherit", transition:"all 0.15s",
                        }}>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                            <span style={{ fontSize:"13px", color: p.id-1===activePhase?p.color:"#666", fontWeight:"700" }}>
                              {p.icon} Phase {p.id} — {p.shortTitle}
                            </span>
                            <span style={{ fontSize:"11px", color:"#333" }}>{p.challenges.length} problems</span>
                          </div>
                          <div style={{ fontSize:"12px", color:"#444", lineHeight:"1.5" }}>
                            {p.challenges[0].slice(0,64)}…
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </main>
      </div>

      {/* ══ FOOTER ══ */}
      <footer style={{
        borderTop:"1px solid #111", padding: isMobile?"14px 18px":"14px 32px",
        display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"8px",
        background:"#070707",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{
            width:"22px", height:"22px", borderRadius:"50%",
            background:"linear-gradient(135deg,#C8F542,#42C8F5)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"11px", fontWeight:"900", color:"#000",
          }}>N</div>
          <span style={{ fontSize:"12px", color:"#444" }}>
            <span style={{ color:"#C8F542", fontWeight:"700" }}>nexuscodex</span>
            {" "}· Build-Everything CS Curriculum · {phases.length} phases · {totalPossible} mastery tasks
          </span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <span style={{ fontSize:"11px", color:"#2a2a2a" }}>MIT · CMU · Stanford · Berkeley · ETH Zürich · Harvard</span>
        </div>
      </footer>
    </div>
  );
}
