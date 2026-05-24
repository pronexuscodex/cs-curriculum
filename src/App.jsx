import { useState, useEffect, useRef } from "react";

/* ─── RESOURCE DATA ─────────────────────────────────────────────────────── */
const resourcesByPhase = {
  1: {
    courses: [
      { name: "MIT 6.042J — Math for CS", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/", tag: "MIT OCW", stars: 5 },
      { name: "Discrete Mathematics (UC San Diego)", url: "https://www.coursera.org/specializations/discrete-mathematics", tag: "Coursera", stars: 5 },
      { name: "Discrete Math — Shanghai Jiao Tong", url: "https://www.coursera.org/learn/discrete-mathematics", tag: "Coursera", stars: 4 },
      { name: "CS50x — Harvard Intro to CS", url: "https://cs50.harvard.edu/x/", tag: "Free/edX", stars: 5 },
      { name: "Khan Academy: Logic & Proofs", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:logic", tag: "Khan", stars: 4 },
      { name: "Codecademy: Discrete Math", url: "https://www.codecademy.com/learn/discrete-math", tag: "Codecademy", stars: 3 },
    ],
    books: [
      { name: "Discrete Math: An Open Introduction (free PDF)", url: "https://discrete.openmathbooks.org/", tag: "Free Book" },
      { name: "A Cool Brisk Walk Through Discrete Math", url: "https://www.allthemath.org/", tag: "Free Book" },
      { name: "MIT Math for CS — Lecture Notes", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/pages/readings/", tag: "Free Notes" },
      { name: "The C Programming Language (K&R)", url: "https://en.wikipedia.org/wiki/The_C_Programming_Language", tag: "Classic" },
    ],
    practice: [
      { name: "GeeksforGeeks: Discrete Math", url: "https://www.geeksforgeeks.org/engineering-mathematics/discrete-mathematics-tutorial/", tag: "Practice" },
      { name: "VisuAlgo — Algorithm Visualizer", url: "https://visualgo.net/", tag: "Visual" },
      { name: "Brilliant.org: Logic", url: "https://brilliant.org/courses/logic/", tag: "Interactive" },
    ],
    videos: [
      { name: "MIT 6.042 Lecture Videos (YouTube)", url: "https://www.youtube.com/playlist?list=PLB7540DEDD482705B", tag: "YouTube" },
      { name: "Trefor Bazett: Discrete Math Full Course", url: "https://www.youtube.com/watch?v=rdXw7Ps9vxc&list=PLHXZ9OQGMqxersk8fUxiUMSIx0DBqsKZS", tag: "YouTube" },
    ],
  },
  2: {
    courses: [
      { name: "MIT 6.096 — Intro to C & C++", url: "https://ocw.mit.edu/courses/6-s096-introduction-to-c-and-c-january-iap-2013/", tag: "MIT OCW", stars: 5 },
      { name: "MIT 6.087 — Practical Programming in C", url: "https://ocw.mit.edu/courses/6-087-practical-programming-in-c-january-iap-2010/", tag: "MIT OCW", stars: 5 },
      { name: "C Programming: Pointers & Memory (Dartmouth)", url: "https://www.coursera.org/learn/c-programming-pointers-and-memory-management", tag: "Coursera", stars: 4 },
      { name: "CS50x — Psets 3–5 (Arrays, Memory, DS)", url: "https://cs50.harvard.edu/x/", tag: "Harvard", stars: 5 },
    ],
    books: [
      { name: "Beej's Guide to C Programming (free)", url: "https://beej.us/guide/bgc/", tag: "Free Book" },
      { name: "Learn C the Hard Way (online chapters)", url: "https://learncodethehardway.org/c/", tag: "Free Chapters" },
      { name: "Build Your Own Lisp (free)", url: "http://www.buildyourownlisp.com/", tag: "Free Book" },
    ],
    practice: [
      { name: "GeeksforGeeks: Graph Algorithms", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/", tag: "Practice" },
      { name: "VisuAlgo: Graph Traversal", url: "https://visualgo.net/en/graphds", tag: "Visual" },
      { name: "CS Circles (Waterloo) — C Exercises", url: "https://cscircles.cemc.uwaterloo.ca/", tag: "Interactive" },
    ],
    videos: [
      { name: "Jacob Sorber: C Pointers (YouTube)", url: "https://www.youtube.com/c/JacobSorber", tag: "YouTube" },
      { name: "Low Level Learning (YouTube)", url: "https://www.youtube.com/@LowLevelLearning", tag: "YouTube" },
    ],
  },
  3: {
    courses: [
      { name: "MIT 6.006 — Intro to Algorithms", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", tag: "MIT OCW", stars: 5 },
      { name: "MIT 6.046J — Design & Analysis of Algorithms", url: "https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/", tag: "MIT OCW", stars: 5 },
      { name: "Stanford: Algorithms Design & Analysis", url: "https://www.coursera.org/specializations/algorithms", tag: "Coursera", stars: 5 },
      { name: "UC Berkeley CS61B — Data Structures", url: "https://datastructur.es/", tag: "Berkeley", stars: 5 },
      { name: "Georgia Tech: Data Structures & Algorithms", url: "https://www.coursera.org/specializations/data-structures-algorithms-georgia-tech", tag: "Coursera", stars: 4 },
    ],
    books: [
      { name: "CLRS — Introduction to Algorithms (MIT Press)", url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/", tag: "Textbook" },
      { name: "Algorithm Design Manual — Skiena", url: "http://www.algorist.com/", tag: "Textbook" },
      { name: "Open Data Structures (free PDF)", url: "https://opendatastructures.org/", tag: "Free Book" },
    ],
    practice: [
      { name: "LeetCode (free tier)", url: "https://leetcode.com/", tag: "Practice" },
      { name: "VisuAlgo — Trees, Sorting, Graphs", url: "https://visualgo.net/", tag: "Visual" },
      { name: "USACO Training", url: "https://train.usaco.org/", tag: "Competitive" },
      { name: "HackerRank: Data Structures", url: "https://www.hackerrank.com/domains/data-structures", tag: "Practice" },
    ],
    videos: [
      { name: "MIT 6.006 Fall 2011 Lectures (YouTube)", url: "https://www.youtube.com/playlist?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb", tag: "YouTube" },
      { name: "Abdul Bari: Algorithms", url: "https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O", tag: "YouTube" },
    ],
  },
  4: {
    courses: [
      { name: "CMU 15-213: Intro to Computer Systems (CSAPP)", url: "https://www.cs.cmu.edu/~213/", tag: "CMU", stars: 5 },
      { name: "Nand2Tetris Part I & II", url: "https://www.coursera.org/learn/build-a-computer", tag: "Coursera", stars: 5 },
      { name: "MIT 6.004 — Computation Structures", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", tag: "MIT OCW", stars: 5 },
      { name: "Georgia Tech: Advanced OS", url: "https://www.udacity.com/course/advanced-operating-systems--ud189", tag: "Udacity", stars: 4 },
      { name: "CMU Intro to Computer Architecture (videos)", url: "https://www.youtube.com/playlist?list=PL5PHm2jkkXmidJOd59REog9jDnPDTG6IJ", tag: "YouTube", stars: 5 },
      { name: "Berkeley CS162 — Operating Systems", url: "https://cs162.org/", tag: "Berkeley", stars: 5 },
    ],
    books: [
      { name: "CS:APP — Computer Systems: A Programmer's Perspective", url: "https://csapp.cs.cmu.edu/", tag: "Textbook" },
      { name: "Operating Systems: 3 Easy Pieces (free PDF)", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/", tag: "Free Book" },
      { name: "Nand2Tetris Book (The Elements of Computing Systems)", url: "https://www.nand2tetris.org/book", tag: "Textbook" },
      { name: "xv6 — MIT's teaching OS (free)", url: "https://pdos.csail.mit.edu/6.828/2023/xv6.html", tag: "Free OS" },
    ],
    practice: [
      { name: "OSDev Wiki — OS from scratch", url: "https://wiki.osdev.org/", tag: "Reference" },
      { name: "CSAPP Labs (bomb, buflab, malloclab)", url: "https://csapp.cs.cmu.edu/3e/labs.html", tag: "Labs" },
      { name: "Write a Simple OS from Scratch (GitHub)", url: "https://github.com/cfenollosa/os-tutorial", tag: "Tutorial" },
    ],
    videos: [
      { name: "MIT 6.828 OS Engineering (YouTube)", url: "https://www.youtube.com/watch?v=y2oy-mRQlGE&list=PLfciLKR3SgqNJKKIKUliWoNBBH1Vhl-xD", tag: "YouTube" },
      { name: "Low Level Learning: OS Dev Series", url: "https://www.youtube.com/@LowLevelLearning", tag: "YouTube" },
    ],
  },
  5: {
    courses: [
      { name: "MIT 6.824 — Distributed Systems", url: "https://pdos.csail.mit.edu/6.824/", tag: "MIT", stars: 5 },
      { name: "Georgia Tech: Computer Networking", url: "https://www.coursera.org/learn/computer-networking", tag: "Coursera", stars: 5 },
      { name: "Stanford CS144 — Intro to Computer Networks", url: "https://cs144.github.io/", tag: "Stanford", stars: 5 },
      { name: "Cambridge: Distributed Systems (8 lectures)", url: "https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB", tag: "YouTube", stars: 5 },
      { name: "Distributed Systems Course (free)", url: "https://www.distributedsystemscourse.com/", tag: "Free", stars: 4 },
    ],
    books: [
      { name: "Beej's Guide to Network Programming (free)", url: "https://beej.us/guide/bgnet/", tag: "Free Book" },
      { name: "Designing Data-Intensive Applications — Kleppmann", url: "https://dataintensive.net/", tag: "Textbook" },
      { name: "Distributed Systems — Tanenbaum (3rd ed, free PDF)", url: "https://www.distributed-systems.net/index.php/books/ds3/", tag: "Free Book" },
      { name: "Computer Networks: A Top-Down Approach", url: "https://gaia.cs.umass.edu/kurose_ross/index.html", tag: "Textbook" },
    ],
    practice: [
      { name: "MIT 6.824 Labs (Raft, MapReduce, KV)", url: "https://pdos.csail.mit.edu/6.824/labs/lab-mr.html", tag: "Labs" },
      { name: "PingCAP Talent Plan: Distributed Systems in Rust", url: "https://github.com/pingcap/talent-plan", tag: "GitHub" },
    ],
    videos: [
      { name: "MIT 6.824 Spring 2020 Lectures (YouTube)", url: "https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB", tag: "YouTube" },
      { name: "Martin Kleppmann: Distributed Systems", url: "https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB", tag: "YouTube" },
    ],
  },
  6: {
    courses: [
      { name: "Stanford Compilers (Alex Aiken)", url: "https://www.classcentral.com/course/compilers-328", tag: "Stanford", stars: 5 },
      { name: "Cornell CS6120 — Advanced Compilers (free)", url: "https://www.cs.cornell.edu/courses/cs6120/2020fa/", tag: "Cornell", stars: 5 },
      { name: "Write an Interpreter in Go / Monkey Lang", url: "https://interpreterbook.com/", tag: "Book/Course", stars: 4 },
      { name: "Udacity: Programming Languages", url: "https://www.udacity.com/course/programming-languages--cs262", tag: "Udacity", stars: 4 },
    ],
    books: [
      { name: "Crafting Interpreters — Bob Nystrom (free online)", url: "https://www.craftinginterpreters.com/", tag: "Free Book" },
      { name: "Build Your Own Lisp (free)", url: "http://www.buildyourownlisp.com/", tag: "Free Book" },
      { name: "SICP — Structure & Interpretation (free MIT)", url: "https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html", tag: "Free Book" },
      { name: "Dragon Book — Compilers: Principles, Techniques (Aho)", url: "https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools", tag: "Classic" },
    ],
    practice: [
      { name: "Write a Brainfuck Interpreter (exercise)", url: "https://esolangs.org/wiki/Brainfuck", tag: "Exercise" },
      { name: "Matt Might's Blog: Compilers & PL", url: "https://matt.might.net/articles/", tag: "Blog" },
      { name: "LLVM Tutorial — Building a JIT", url: "https://llvm.org/docs/tutorial/", tag: "Tutorial" },
    ],
    videos: [
      { name: "Stanford Compilers Lectures (YouTube)", url: "https://www.youtube.com/watch?v=sm0QQO-WZlM&list=PLTW_jEXtShYJVZr3fIXkr9LVE6IVpqOmS", tag: "YouTube" },
      { name: "Tsoding: Writing a Language in C", url: "https://www.youtube.com/@tsoding", tag: "YouTube" },
    ],
  },
  7: {
    courses: [
      { name: "CMU 15-445 — Intro to Database Systems", url: "https://15445.courses.cs.cmu.edu/", tag: "CMU", stars: 5 },
      { name: "CMU 15-721 — Advanced Database Systems", url: "https://15721.courses.cs.cmu.edu/", tag: "CMU", stars: 5 },
      { name: "UC Berkeley CS186 — Intro to Database Systems", url: "https://cs186berkeley.net/", tag: "Berkeley", stars: 5 },
      { name: "Stanford DB Mini-Courses (edX)", url: "https://online.stanford.edu/courses/soe-ydatabases0005-databases-advanced-topics-sql", tag: "Stanford", stars: 4 },
    ],
    books: [
      { name: "Readings in Database Systems — Red Book (free)", url: "http://www.redbook.io/", tag: "Free Book" },
      { name: "Designing Data-Intensive Applications", url: "https://dataintensive.net/", tag: "Textbook" },
      { name: "Modern B-Tree Techniques (free paper)", url: "https://w6113.github.io/files/papers/btreesurvey-graefe.pdf", tag: "Free Paper" },
      { name: "Database Internals — Alex Petrov", url: "https://www.databass.dev/", tag: "Textbook" },
    ],
    practice: [
      { name: "CMU 15-445 Bustub Labs (GitHub)", url: "https://github.com/cmu-db/bustub", tag: "GitHub Labs" },
      { name: "SQLite Source Code (study)", url: "https://www.sqlite.org/src/doc/trunk/README.md", tag: "Open Source" },
      { name: "Build Your Own SQLite (CodeCrafters free)", url: "https://app.codecrafters.io/courses/sqlite/overview", tag: "Tutorial" },
    ],
    videos: [
      { name: "CMU 15-445 Lecture Videos (YouTube)", url: "https://www.youtube.com/playlist?list=PLSE8ODhjZXjbj8BMuIrRcacnQh20hmY9g", tag: "YouTube" },
      { name: "Andy Pavlo Talks: DB Internals", url: "https://www.youtube.com/@CMUDatabaseGroup", tag: "YouTube" },
    ],
  },
  8: {
    courses: [
      { name: "Stanford: Cryptography I (Dan Boneh)", url: "https://www.coursera.org/learn/crypto", tag: "Coursera", stars: 5 },
      { name: "Stanford: Cryptography II", url: "https://www.coursera.org/learn/crypto2", tag: "Coursera", stars: 5 },
      { name: "pwn.college — Binary Exploitation (free)", url: "https://pwn.college/", tag: "Free", stars: 5 },
      { name: "OverTheWire: Wargames (free)", url: "https://overthewire.org/wargames/", tag: "Free Labs", stars: 5 },
      { name: "OpenSecurityTraining2 (free OS security)", url: "https://opensecuritytraining.info/", tag: "Free", stars: 4 },
      { name: "Cryptopals Challenges (free)", url: "https://cryptopals.com/", tag: "Free", stars: 5 },
    ],
    books: [
      { name: "A Graduate Course in Applied Cryptography (free)", url: "https://toc.cryptobook.us/", tag: "Free Book" },
      { name: "The Art of Exploitation — Erickson", url: "https://nostarch.com/hacking2.htm", tag: "Textbook" },
      { name: "Serious Cryptography — Aumasson", url: "https://nostarch.com/seriouscrypto", tag: "Textbook" },
      { name: "Hacking: The Art of Exploitation (free sample)", url: "https://archive.org/details/hacking-the-art-of-exploitation", tag: "Free Sample" },
    ],
    practice: [
      { name: "Cryptohack.org — Cryptography challenges", url: "https://cryptohack.org/", tag: "Practice" },
      { name: "picoCTF — Free CTF for beginners", url: "https://picoctf.org/", tag: "CTF" },
      { name: "CTFtime.org — CTF calendar", url: "https://ctftime.org/", tag: "CTF" },
      { name: "OWASP WebGoat — Secure coding", url: "https://owasp.org/www-project-webgoat/", tag: "Practice" },
    ],
    videos: [
      { name: "LiveOverflow: Hacking & Security (YouTube)", url: "https://www.youtube.com/@LiveOverflow", tag: "YouTube" },
      { name: "Dan Boneh: Cryptography Lectures (YouTube)", url: "https://www.youtube.com/watch?v=2aHkqB2-46k&list=PL9oqNDMzcMClAPkp4pne89hWBFGmhw29Y", tag: "YouTube" },
    ],
  },
};

/* ─── PHASE DATA ─────────────────────────────────────────────────────────── */
const phases = [
  {
    id: 1, title: "Mathematical Logic, Binary Systems & Foundations", shortTitle: "Math & Logic",
    color: "#C8F542", darkColor: "#1a2200", icon: "∴", tagline: "From transistors to truth — where computation is born",
    difficulty: "Foundations", weeks: "6–8 weeks",
    math: ["Propositions, Boolean algebra, truth tables","Logical equivalence, implication, XOR, De Morgan's Laws","Sets, relations, functions","Proof techniques: induction, contradiction, contraposition","Recursion mathematics","Binary arithmetic, modular arithmetic, number systems"],
    hardware: ["Transistors and voltage states","Logic gates (AND, OR, NOT, NAND, NOR, XOR)","Binary encoding and machine representation","ALUs, registers, CPU execution cycles","Instruction pipelines, bit manipulation","Memory cells and cache basics"],
    cpp: ["Variables, primitive types, signed vs unsigned integers","Integer overflow and binary representation","Loops, branching, functions, arrays, strings","Bitwise operations","Stack memory and compiler basics"],
    projects: [
      { name: "Logic Gate Simulator", letter: "A", items: ["Dynamic truth tables","Logical expression parsing","Binary evaluation engine","NAND/NOR/XOR/implication support"] },
      { name: "Binary Arithmetic Engine", letter: "B", items: ["Binary add/subtract/multiply","Bit shifting","Overflow detection","Signed integer representation"] },
    ],
    pedagogy: ["Explain intuitively → formally → hardware → memory → CPU → C → implementation","Derive every truth table from axioms","Connect Boolean algebra directly to gate circuits","Trace binary arithmetic through registers step-by-step"],
    checklist: {
      theory: ["Prove De Morgan's Laws from axioms","Derive truth tables for compound expressions","Solve modular arithmetic problems","Explain CPU pipeline stages"],
      programming: ["Implement a full Boolean expression evaluator in C","Write bitwise ops without arithmetic operators","Debug integer overflow with gdb","Analyze binary representation of floats"],
      engineering: ["Build a 4-bit adder simulation","Implement binary-to-decimal converter","Measure bit manipulation performance","Explain cache line implications of data layout"],
    },
    challenges: ["Prove that NAND is functionally complete","Implement multiplication using only bit shifts and addition","Derive the two's complement representation from first principles","Build a 1-bit full adder circuit diagram and implement it in C"],
  },
  {
    id: 2, title: "Memory, Pointers, Graphs & Dynamic Data Structures", shortTitle: "Memory & Graphs",
    color: "#42C8F5", darkColor: "#001a22", icon: "→", tagline: "The machine's memory is yours to command",
    difficulty: "Intermediate", weeks: "6–8 weeks",
    math: ["Graph theory: directed/undirected graphs, trees","Weighted graphs and adjacency representations","Graph traversal algorithms","Combinatorics fundamentals","Recurrence relations","Probability basics for algorithm analysis"],
    hardware: ["RAM architecture and address spaces","Stack vs heap physical layout","Pointer dereferencing at machine level","Cache locality and spatial locality","TLB and virtual address translation","Memory fragmentation effects"],
    cpp: ["Pointers and pointer arithmetic","Memory addresses and indirection","malloc / calloc / realloc / free","Structs, linked lists, queues, stacks","Recursion internals and stack frames","Debugging segfaults and memory corruption"],
    projects: [
      { name: "Graph Library", letter: "A", items: ["Adjacency lists","BFS / DFS","Shortest path (Dijkstra)","Cycle detection","Topological sort","Graph serialization"] },
      { name: "Custom Memory Allocator", letter: "B", items: ["Simulate malloc/free","Heap block management","Free-list implementation","Fragmentation handling","Allocation tracking & debugging"] },
    ],
    pedagogy: ["Draw RAM diagrams for every pointer dereference","Trace linked list traversal at the address level","Show heap allocation maps before and after each malloc/free","Explain cache miss cost with real timing data"],
    checklist: {
      theory: ["Prove BFS visits all reachable nodes","Derive Dijkstra's correctness via invariant","Analyze recurrence for recursive DFS","Explain virtual memory paging"],
      programming: ["Implement doubly-linked list with full memory safety","Write a stack using dynamic arrays","Debug a use-after-free with valgrind","Implement BFS and DFS iteratively"],
      engineering: ["Build a memory pool allocator","Measure cache performance of array vs linked list traversal","Serialize/deserialize a graph to binary file","Implement a cycle detector for directed graphs"],
    },
    challenges: ["Implement a lock-free stack using atomic CAS operations","Write a garbage collector for a custom memory arena","Prove topological sort produces a valid linear ordering","Build a graph isomorphism checker"],
  },
  {
    id: 3, title: "Algorithms, Trees & Complexity Theory", shortTitle: "Algorithms",
    color: "#F5A742", darkColor: "#221500", icon: "Θ", tagline: "Measure everything — nothing is free",
    difficulty: "Intermediate", weeks: "8–10 weeks",
    math: ["Asymptotic analysis: Big-O, Big-Θ, Big-Ω","Recurrence solving: Master Theorem, substitution, recursion trees","Divide and conquer paradigm","Combinatorial analysis","Probability in algorithm analysis","Amortized analysis"],
    hardware: ["CPU branch prediction and mis-prediction costs","Cache hierarchy and algorithm design","Memory access patterns and prefetching","Register pressure in tight loops","SIMD vectorization opportunities"],
    cpp: ["BSTs, AVL trees, Red-Black Trees","Heaps and priority queues","Hash tables with collision handling","Tries and disjoint sets","Profiling and benchmarking in C","Timing with clock_gettime"],
    projects: [
      { name: "AVL Tree Engine", letter: "A", items: ["Insertion & deletion","Rotations and balancing","All traversals","Performance measurement","Serialization to disk"] },
      { name: "Hash Table Database Engine", letter: "B", items: ["Open/closed addressing","Custom hash functions","Dynamic resizing","Persistence layer","Benchmarking harness"] },
    ],
    pedagogy: ["Derive every complexity bound from the recurrence","Show recursion trees for divide-and-conquer algorithms","Profile real C code to confirm asymptotic predictions","Compare cache behavior of BST vs array for same workload"],
    checklist: {
      theory: ["Apply Master Theorem to 5+ recurrences","Prove AVL height bound O(log n)","Derive amortized cost of dynamic array resize","Prove correctness of Quicksort partition"],
      programming: ["Implement Red-Black Tree from scratch","Build a min-heap with decrease-key","Write a perfect hash for a known key set","Implement radix sort and analyze it"],
      engineering: ["Benchmark BST vs hash table for 10M operations","Profile AVL rotations under adversarial input","Tune hash function to minimize collisions","Implement cache-oblivious B-tree layout"],
    },
    challenges: ["Implement a van Emde Boas tree","Prove the lower bound Ω(n log n) for comparison-based sorting","Build a self-adjusting splay tree","Derive the exact constant in quicksort's average case"],
  },
  {
    id: 4, title: "Computer Architecture & Operating Systems", shortTitle: "Arch & OS",
    color: "#F542A7", darkColor: "#220015", icon: "⚙", tagline: "The OS is just software — so build one",
    difficulty: "Advanced", weeks: "10–12 weeks",
    math: ["Boolean algebra applied to instruction encoding","Modular arithmetic in memory addressing","Scheduling theory and queueing models","Deadlock detection via graph theory","Virtual memory address translation math"],
    hardware: ["CPU pipeline stages: fetch, decode, execute, writeback","Out-of-order execution and speculative execution","Memory hierarchy: L1/L2/L3/DRAM","TLB, page tables, and ASLR","Interrupt controllers and IRQ handling","DMA, I/O buses"],
    cpp: ["Assembly fundamentals (x86-64 and RISC-V)","System calls and the kernel/user boundary","Process creation with fork/exec","Threads with pthreads","Mutex, semaphore, condition variables","File system calls: open/read/write/mmap"],
    projects: [
      { name: "Mini Shell", letter: "A", items: ["Command parsing","Process spawning (fork/exec)","Pipes and I/O redirection","Job control (fg/bg/&)","Built-in commands"] },
      { name: "Toy OS Kernel", letter: "B", items: ["Boot sequence","Memory management (paging)","Round-robin scheduler","Interrupt handling","Console driver","System call interface"] },
    ],
    pedagogy: ["Trace a system call from user space to kernel and back","Show page table walk for a virtual address","Demonstrate context switch with register save/restore","Implement scheduling algorithms and compare latency"],
    checklist: {
      theory: ["Explain all 5 CPU pipeline stages","Prove deadlock conditions (Coffman's 4)","Derive virtual address translation formula","Compare scheduling algorithms: SJF, RR, CFS"],
      programming: ["Write a Unix shell with job control","Implement reader-writer lock","Build a memory allocator using mmap","Write a kernel module for Linux"],
      engineering: ["Boot a minimal OS kernel on QEMU","Implement a file system in user space (FUSE)","Measure context switch overhead","Build a process monitor with /proc parsing"],
    },
    challenges: ["Implement priority inheritance for mutex to prevent priority inversion","Build a wait-free ring buffer for producer-consumer","Write a memory profiler using ptrace","Implement a simple hypervisor using KVM API"],
  },
  {
    id: 5, title: "Networking & Distributed Systems", shortTitle: "Networks",
    color: "#A742F5", darkColor: "#130022", icon: "⇌", tagline: "Networks fail — design for it",
    difficulty: "Advanced", weeks: "8–10 weeks",
    math: ["Graph theory applied to routing","Queueing theory for network modeling","Information theory basics (Shannon entropy)","Consistency models: CAP theorem","Paxos and Raft consensus mathematics","Bloom filters and probabilistic data structures"],
    hardware: ["NIC hardware and interrupt coalescing","Kernel bypass networking (DPDK)","TCP offloading and checksum computation","Memory-mapped network buffers","RDMA concepts"],
    cpp: ["BSD socket API: socket/bind/listen/accept/connect","TCP servers (multi-process, multi-thread, epoll)","UDP communication","Non-blocking I/O and select/poll/epoll","HTTP/1.1 protocol parsing","TLS basics with OpenSSL"],
    projects: [
      { name: "HTTP Web Server", letter: "A", items: ["TCP socket handling","HTTP/1.1 parser","Static file serving","Concurrent with epoll","Request/response logging","Keep-alive connections"] },
      { name: "Distributed Key-Value Store", letter: "B", items: ["Consistent hashing ring","Replication protocol","Basic Raft consensus","Fault tolerance (node failure)","Client library"] },
    ],
    pedagogy: ["Trace a packet from application through TCP/IP stack to wire","Show the 3-way TCP handshake with sequence numbers","Explain CAP theorem with concrete examples","Demonstrate split-brain scenario and resolution"],
    checklist: {
      theory: ["Explain all 7 OSI layers with examples","Derive TCP congestion window algorithm","Prove CAP theorem impossibility","Explain Raft leader election invariants"],
      programming: ["Build a TCP chat server with epoll","Implement HTTP chunked transfer encoding","Write a DNS resolver from scratch","Implement consistent hashing with virtual nodes"],
      engineering: ["Deploy a 3-node Raft cluster","Measure TCP throughput vs UDP for bulk transfer","Build a load balancer with health checks","Implement connection pooling"],
    },
    challenges: ["Implement the Phi Accrual failure detector","Build a vector clock library for distributed causality","Prove that Paxos ensures safety under network partition","Implement a CRDT (conflict-free replicated data type)"],
  },
  {
    id: 6, title: "Compilers, Interpreters & Language Engineering", shortTitle: "Compilers",
    color: "#F5E242", darkColor: "#222000", icon: "λ", tagline: "Languages are just programs — write one",
    difficulty: "Advanced", weeks: "10–12 weeks",
    math: ["Formal grammars: regular, context-free, context-sensitive","Chomsky hierarchy","Automata theory: DFA, NFA, PDA","Regular expressions and Kleene star","Type theory basics","Lambda calculus"],
    hardware: ["Call stack and calling conventions (System V ABI)","Register allocation and spilling","Instruction selection and code generation","Branch prediction and compiled control flow","Cache effects of generated code layout"],
    cpp: ["Lexer / tokenizer implementation","Recursive descent parser","Abstract Syntax Tree (AST) construction","Symbol table and scope management","Bytecode instruction set design","Stack-based virtual machine"],
    projects: [
      { name: "Custom Language Interpreter", letter: "A", items: ["Lexer (tokenizer)","Recursive descent parser","AST generation","Tree-walking evaluator","Variables, functions, closures","Control flow: if/while/for"] },
      { name: "Bytecode Virtual Machine", letter: "B", items: ["Bytecode instruction set","Stack machine execution engine","Memory management","Mark-and-sweep garbage collector","REPL interface"] },
    ],
    pedagogy: ["Show token stream → parse tree → AST transformation","Trace execution of a function call through the VM stack","Implement each compiler phase as a standalone, testable pass","Connect lambda calculus reductions to actual language evaluation"],
    checklist: {
      theory: ["Prove a grammar is ambiguous or unambiguous","Convert NFA to DFA via subset construction","Explain LL(1) vs LR(1) parsing differences","Derive type inference rules for a simple type system"],
      programming: ["Write a lexer for a C-like language","Implement Pratt parser for expressions","Build a mark-and-sweep GC","Implement tail-call optimization in the VM"],
      engineering: ["Add a standard library to your language","Implement a REPL with line editing","Add error recovery to your parser","Benchmark interpreter vs compiled performance"],
    },
    challenges: ["Implement Hindley-Milner type inference","Add coroutines to your language","Write a compiler backend that emits x86-64 assembly","Implement a tracing JIT compiler"],
  },
  {
    id: 7, title: "Databases, Storage Engines & Performance Engineering", shortTitle: "Databases",
    color: "#42F5C8", darkColor: "#002218", icon: "⊕", tagline: "Data outlives code — store it right",
    difficulty: "Advanced", weeks: "8–10 weeks",
    math: ["B-Tree invariants and height proofs","Relational algebra: select, project, join, union","Transaction serializability theory","MVCC snapshot isolation mathematics","Write-ahead logging correctness proofs","Index selectivity statistics"],
    hardware: ["Disk I/O: seeks, rotational latency, sequential reads","SSD internals: NAND, wear leveling, write amplification","Page cache and buffer pool management","fsync vs fdatasync guarantees","NUMA effects on concurrent database workloads"],
    cpp: ["B-Tree implementation with page management","WAL (write-ahead log) implementation","Buffer pool with LRU eviction","SQL tokenizer and parser","MVCC transaction management","perf, flamegraph, cachegrind profiling"],
    projects: [
      { name: "Mini Relational Database", letter: "A", items: ["SQL parser (SELECT/INSERT/UPDATE/DELETE)","B-Tree index engine","Buffer pool manager","WAL for crash recovery","MVCC transactions","Query executor"] },
      { name: "Performance Profiler", letter: "B", items: ["Timing instrumentation (RDTSC)","Memory allocation tracker","Flamegraph output","Cache miss counter via perf_events","Visual metrics dashboard"] },
    ],
    pedagogy: ["Trace a SQL query through parser → planner → executor → storage","Show B-Tree split/merge with page diagrams","Demonstrate ACID violations when locking is wrong","Profile a query before and after adding an index"],
    checklist: {
      theory: ["Prove B-Tree height is O(log n)","Derive 2PL serializability from conflict graph","Explain MVCC vs locking trade-offs","Prove WAL sufficiency for crash recovery"],
      programming: ["Implement B-Tree with delete and merge","Write a WAL with checkpointing","Build an LRU buffer pool","Implement MVCC with timestamp ordering"],
      engineering: ["Benchmark sequential vs random I/O on your DB","Add query planning with cost estimates","Implement a columnar storage format","Build replication for your database"],
    },
    challenges: ["Implement LSM-tree (Log-Structured Merge-tree) storage","Add snapshot isolation to your MVCC engine","Build a vectorized query executor","Prove your WAL implementation is crash-consistent"],
  },
  {
    id: 8, title: "Security, Cryptography & Advanced Systems", shortTitle: "Security",
    color: "#F55442", darkColor: "#220800", icon: "⚿", tagline: "The attacker reads your code — so should you",
    difficulty: "Expert", weeks: "8–10 weeks",
    math: ["Modular arithmetic and finite fields","Group theory foundations for cryptography","RSA and elliptic curve mathematics","SHA-256 and hash function properties","Information-theoretic security","Formal security proofs (reduction proofs)"],
    hardware: ["CPU speculative execution and Spectre/Meltdown","Hardware security modules (HSM)","Trusted execution environments (SGX)","Side-channel attacks: timing, cache, power","ASLR, stack canaries, NX bits at hardware level"],
    cpp: ["Buffer overflow exploitation and prevention","Stack smashing: return address overwrite","Heap corruption: use-after-free, double-free","ASLR, PIE, stack canaries in GCC","Secure coding patterns","OpenSSL: AES-256, RSA, ECDH, SHA-256"],
    projects: [
      { name: "Secure File Encryption Tool", letter: "A", items: ["AES-256-GCM encryption","PBKDF2 key derivation","HMAC authentication","Secure memory wiping","CLI interface"] },
      { name: "Memory Vulnerability Demonstrator", letter: "B", items: ["Controlled buffer overflow demo","Stack canary bypass analysis","Heap corruption examples","ASLR effectiveness test","Mitigation comparison"] },
    ],
    pedagogy: ["Demonstrate a live stack overflow exploit in a controlled environment","Derive RSA key generation step by step","Show how ASLR defeats naive return-to-libc attacks","Implement AES by hand to understand the algorithm deeply"],
    checklist: {
      theory: ["Derive RSA correctness from Euler's theorem","Prove SHA-256 preimage resistance informally","Explain why buffer overflows work at assembly level","Describe all 4 Coffman conditions in a security context"],
      programming: ["Implement AES-128 from scratch","Write a secure memory allocator (zeroing, guard pages)","Build a timing-safe string comparison","Implement Diffie-Hellman key exchange"],
      engineering: ["Audit a C codebase for CVE-class vulnerabilities","Set up ASAN/UBSan for a project","Build a fuzzer for your HTTP parser","Harden your shell from Phase 4 against injection"],
    },
    challenges: ["Implement elliptic curve Diffie-Hellman (ECDH) from scratch","Write a proof-of-concept ROP chain (controlled lab environment)","Implement a constant-time comparison function and verify with timing analysis","Build a fuzzer that finds a real bug in a known open-source C project"],
  },
];

const capstoneProjects = [
  { name: "Miniature OS", desc: "Boot, schedule, page memory, handle interrupts, support a shell", icon: "⚙", color: "#F542A7" },
  { name: "Programming Language", desc: "Full compiler with standard library, GC, and IDE integration", icon: "λ", color: "#F5E242" },
  { name: "Distributed Database", desc: "SQL, B-Tree storage, Raft consensus, replication", icon: "⊕", color: "#42F5C8" },
  { name: "Multiplayer Network Engine", desc: "UDP game protocol, lag compensation, authoritative server", icon: "⇌", color: "#A742F5" },
  { name: "Software Renderer", desc: "Rasterizer, z-buffer, texturing, lighting — no GPU APIs", icon: "◈", color: "#42C8F5" },
  { name: "Compiler Toolchain", desc: "Lexer → parser → optimizer → x86-64 code generator", icon: "▶", color: "#F5A742" },
  { name: "Container Runtime", desc: "Linux namespaces, cgroups, overlay filesystem, OCI spec", icon: "□", color: "#C8F542" },
  { name: "CPU Emulator", desc: "RISC-V emulator with full instruction set and memory model", icon: "∷", color: "#F55442" },
];

const difficultyColors = { "Foundations":"#C8F542","Intermediate":"#42C8F5","Advanced":"#F5A742","Expert":"#F55442" };
const tagColors = { "MIT OCW":"#42C8F5","CMU":"#F55442","Stanford":"#F5E242","Coursera":"#A742F5","Berkeley":"#F5A742","Free Book":"#C8F542","Free":"#C8F542","Free Labs":"#C8F542","YouTube":"#F55442","Harvard":"#42C8F5","Khan":"#42F5C8","Codecademy":"#A742F5","Practice":"#888","Visual":"#888","Interactive":"#888","Blog":"#888","Tutorial":"#888","GitHub":"#888","GitHub Labs":"#888","Labs":"#F5A742","Open Source":"#888","Textbook":"#555","Classic":"#555","CTF":"#F55442","Free Notes":"#C8F542","Free Paper":"#C8F542","Free Sample":"#C8F542","Free/edX":"#C8F542","Book/Course":"#A742F5","Competitive":"#F55442","Udacity":"#42C8F5","Cornell":"#F5E242","Free Chapters":"#C8F542","Reference":"#888","Exercise":"#888" };

function useWindowSize() {
  const [size, setSize] = useState({ width: typeof window !== "undefined" ? window.innerWidth : 1200 });
  useEffect(() => {
    const h = () => setSize({ width: window.innerWidth });
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return size;
}

function StarRating({ stars, color }) {
  return (
    <span style={{ fontSize: "9px", letterSpacing: "1px" }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= stars ? color : "#222" }}>★</span>
      ))}
    </span>
  );
}

function ResourceCard({ item, color }) {
  const tagColor = tagColors[item.tag] || "#555";
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", flexDirection: "column", gap: "6px",
      padding: "12px 14px", background: "#0b0b0b",
      border: "1px solid #151515", borderRadius: "7px",
      textDecoration: "none", transition: "all 0.18s",
      cursor: "pointer",
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = color + "55"; e.currentTarget.style.background = "#0e0e0e"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "#151515"; e.currentTarget.style.background = "#0b0b0b"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "#ccc", lineHeight: "1.4", flex: 1 }}>{item.name}</span>
        <span style={{
          fontSize: "8px", padding: "2px 6px", borderRadius: "3px",
          background: tagColor + "18", color: tagColor,
          border: `1px solid ${tagColor}30`, flexShrink: 0, whiteSpace: "nowrap",
        }}>{item.tag}</span>
      </div>
      {item.stars && <StarRating stars={item.stars} color={color} />}
    </a>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────────────────── */
export default function App() {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1100;

  const [activePhase, setActivePhase] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [checkedItems, setCheckedItems] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCapstone, setShowCapstone] = useState(false);
  const [resourceFilter, setResourceFilter] = useState("all");
  const contentRef = useRef(null);

  const phase = phases[activePhase];
  const resources = resourcesByPhase[phase.id];

  const totalPossible = phases.reduce((a, p) => a + p.checklist.theory.length + p.checklist.programming.length + p.checklist.engineering.length, 0);
  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const pct = Math.round((totalChecked / totalPossible) * 100);

  const phaseChecked = (pid) => {
    const p = phases[pid];
    return [...p.checklist.theory,...p.checklist.programming,...p.checklist.engineering].filter(i => checkedItems[`${p.id}-${["theory","programming","engineering"][Math.floor([...p.checklist.theory,...p.checklist.programming,...p.checklist.engineering].indexOf(i) / (p.checklist.theory.length + p.checklist.programming.length))]}-${i}`]).length;
  };
  const phaseTotal = (pid) => { const p = phases[pid]; return p.checklist.theory.length + p.checklist.programming.length + p.checklist.engineering.length; };
  const phaseCheckedAccurate = (pid) => {
    const p = phases[pid];
    let n = 0;
    ["theory","programming","engineering"].forEach(sec => p.checklist[sec].forEach(item => { if (checkedItems[`${p.id}-${sec}-${item}`]) n++; }));
    return n;
  };

  const toggleCheck = (key) => setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));

  const selectPhase = (i) => {
    setActivePhase(i); setActiveTab("overview");
    setSidebarOpen(false); setShowCapstone(false); setResourceFilter("all");
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "◉" },
    { id: "resources", label: "Resources", icon: "⬡" },
    { id: "math", label: "Math", icon: "∑" },
    { id: "systems", label: "Systems", icon: "▣" },
    { id: "projects", label: "Projects", icon: "◈" },
    { id: "mastery", label: "Mastery", icon: "✓" },
    { id: "challenges", label: "Challenges", icon: "★" },
  ];

  const allResources = resources ? [
    ...resources.courses.map(r => ({...r, category: "Courses"})),
    ...resources.books.map(r => ({...r, category: "Books & Texts"})),
    ...resources.practice.map(r => ({...r, category: "Practice"})),
    ...resources.videos.map(r => ({...r, category: "Videos"})),
  ] : [];

  const filteredResources = resourceFilter === "all" ? allResources : allResources.filter(r => r.category === resourceFilter);

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'Courier New', Menlo, monospace", color: "#e0e0e0", display: "flex", flexDirection: "column" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 2px; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideLeft { from { transform:translateX(-100%); } to { transform:translateX(0); } }
        .phasebtn:hover { background: #0d0d0d !important; }
        .filterbtn:hover { opacity: 1 !important; }
        .resource-link:hover { border-color: rgba(255,255,255,0.15) !important; }
      `}</style>

      {/* HEADER */}
      <header style={{
        position: "sticky", top: 0, zIndex: 200,
        background: "rgba(8,8,8,0.97)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid #111",
        padding: isMobile ? "10px 14px" : "12px 28px",
        display: "flex", alignItems: "center", gap: "10px",
      }}>
        {isMobile && (
          <button onClick={() => setSidebarOpen(v => !v)} style={{
            background: sidebarOpen ? "#141414" : "transparent",
            border: "1px solid #1e1e1e", borderRadius: "5px",
            color: "#666", cursor: "pointer", padding: "7px 9px",
            fontSize: "13px", lineHeight: 1, flexShrink: 0,
          }}>
            {sidebarOpen ? "✕" : "☰"}
          </button>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {!isMobile && <div style={{ fontSize: "8px", color: "#2a2a2a", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1px" }}>MIT · CMU · Stanford · Berkeley · ETH Zürich · Harvard</div>}
          <div style={{ fontSize: isMobile ? "13px" : "15px", fontWeight: "bold", color: "#f0f0f0", letterSpacing: "-0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {isMobile ? "Build-Everything CS" : "Build-Everything Computer Science Curriculum"}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {!isMobile && <span style={{ fontSize: "9px", color: "#333" }}>MASTERY</span>}
          <div style={{ position: "relative", width: isMobile ? "50px" : "90px", height: "3px", background: "#141414", borderRadius: "2px" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: phase.color, borderRadius: "2px", transition: "width 0.5s cubic-bezier(.4,0,.2,1)" }} />
          </div>
          <span style={{ fontSize: "11px", color: phase.color, fontWeight: "bold", minWidth: "30px" }}>{pct}%</span>
        </div>
        <button onClick={() => { setShowCapstone(v => !v); setSidebarOpen(false); }} style={{
          background: showCapstone ? phase.color : "transparent",
          border: `1px solid ${showCapstone ? phase.color : "#1e1e1e"}`,
          borderRadius: "5px", color: showCapstone ? "#000" : "#555",
          cursor: "pointer", padding: isMobile ? "5px 8px" : "6px 12px",
          fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase",
          fontFamily: "inherit", fontWeight: "bold", flexShrink: 0, transition: "all 0.2s",
        }}>
          {isMobile ? "⬟" : "Capstone"}
        </button>
      </header>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        {/* MOBILE OVERLAY */}
        {isMobile && sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 150 }} />
        )}

        {/* SIDEBAR */}
        <aside style={{
          width: isMobile ? "270px" : isTablet ? "195px" : "248px",
          flexShrink: 0, borderRight: "1px solid #0f0f0f",
          overflowY: "auto", background: "#070707",
          ...(isMobile ? {
            position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 160, paddingTop: "62px",
            transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.22s cubic-bezier(.4,0,.2,1)",
          } : {}),
        }}>
          <div style={{ padding: "14px 16px 8px", fontSize: "8px", color: "#2a2a2a", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            8 Phases · ~60 weeks total
          </div>

          {phases.map((p, i) => {
            const checked = phaseCheckedAccurate(i);
            const total = phaseTotal(i);
            const active = activePhase === i && !showCapstone;
            return (
              <button key={p.id} className="phasebtn" onClick={() => selectPhase(i)} style={{
                display: "flex", alignItems: "center", gap: "10px",
                width: "100%", padding: "9px 14px",
                background: active ? "#0d0d0d" : "transparent",
                border: "none", borderLeft: active ? `2px solid ${p.color}` : "2px solid transparent",
                cursor: "pointer", textAlign: "left", transition: "all 0.12s",
              }}>
                <div style={{
                  width: "30px", height: "30px", borderRadius: "6px", flexShrink: 0,
                  background: active ? p.color : "#0d0d0d",
                  border: `1px solid ${active ? p.color : "#181818"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", color: active ? "#000" : p.color, fontWeight: "bold",
                }}>
                  {p.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "8px", color: active ? "#555" : "#282828", marginBottom: "1px", letterSpacing: "0.08em" }}>
                    {p.difficulty.toUpperCase()} · {p.weeks}
                  </div>
                  <div style={{ fontSize: "11px", color: active ? "#f0f0f0" : "#555", fontWeight: active ? "bold" : "normal", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p.shortTitle}
                  </div>
                  <div style={{ marginTop: "3px", height: "2px", background: "#111", borderRadius: "1px" }}>
                    <div style={{ height: "100%", width: `${(checked/total)*100}%`, background: p.color, borderRadius: "1px", transition: "width 0.4s" }} />
                  </div>
                </div>
                <div style={{ fontSize: "9px", color: checked > 0 ? p.color : "#2a2a2a", flexShrink: 0 }}>{checked}/{total}</div>
              </button>
            );
          })}

          {/* Sidebar stats */}
          <div style={{ margin: "12px 14px", padding: "12px", background: "#0a0a0a", border: "1px solid #111", borderRadius: "7px" }}>
            <div style={{ fontSize: "8px", color: "#2a2a2a", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>Progress</div>
            {[["Completed", `${totalChecked}/${totalPossible}`, phase.color],["Phases Done", `${phases.filter((_,i) => phaseCheckedAccurate(i) === phaseTotal(i) && phaseTotal(i) > 0).length}/8`, "#555"],["Mastery", `${pct}%`, pct > 50 ? phase.color : "#555"]].map(([label,val,color]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #0d0d0d" }}>
                <span style={{ fontSize: "10px", color: "#333" }}>{label}</span>
                <span style={{ fontSize: "10px", color }}>{val}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main ref={contentRef} style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>

          {/* CAPSTONE */}
          {showCapstone && (
            <div style={{ animation: "fadeIn 0.25s ease", padding: isMobile ? "20px 16px" : "32px 40px" }}>
              <div style={{ marginBottom: "28px" }}>
                <div style={{ fontSize: "8px", color: "#333", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "5px" }}>Final Milestone</div>
                <div style={{ fontSize: isMobile ? "20px" : "26px", fontWeight: "bold", color: "#fff", letterSpacing: "-0.03em", marginBottom: "8px" }}>Capstone Systems Projects</div>
                <div style={{ fontSize: "12px", color: "#444", lineHeight: "1.7", maxWidth: "580px" }}>
                  After completing all 8 phases, graduate engineers undertake a large-scale project spanning multiple domains. These are built from scratch — not tutorials.
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px", marginBottom: "36px" }}>
                {capstoneProjects.map(c => (
                  <div key={c.name} style={{
                    background: "#0a0a0a", border: "1px solid #131313",
                    borderTop: `2px solid ${c.color}`, borderRadius: "9px", padding: "18px 20px",
                    transition: "all 0.18s",
                  }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{ width: "38px", height: "38px", borderRadius: "7px", background: c.color + "15", border: `1px solid ${c.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", color: c.color, flexShrink: 0 }}>{c.icon}</div>
                      <div>
                        <div style={{ fontSize: "13px", color: "#f0f0f0", fontWeight: "bold", marginBottom: "4px" }}>{c.name}</div>
                        <div style={{ fontSize: "11px", color: "#444", lineHeight: "1.5" }}>{c.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#0a0a0a", border: "1px solid #111", borderRadius: "9px", padding: "22px" }}>
                <SectionLabel color="#C8F542">Graduate Capabilities</SectionLabel>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0" }}>
                  {["Read operating system source code fluently","Implement advanced algorithms from papers","Understand memory at the hardware level","Build scalable distributed systems","Understand compilers from first principles","Write efficient low-level software in C","Reason mathematically about computation","Design professional software architecture","Debug complex systems-level problems","Trace computation from transistor to network"].map(cap => (
                    <div key={cap} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid #0d0d0d" }}>
                      <span style={{ color: "#C8F542", fontSize: "9px", flexShrink: 0, marginTop: "3px" }}>✓</span>
                      <span style={{ fontSize: "12px", color: "#777" }}>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PHASE VIEW */}
          {!showCapstone && (
            <div style={{ animation: "fadeIn 0.2s ease" }}>
              {/* Phase Header */}
              <div style={{ padding: isMobile ? "18px 16px 0" : "26px 40px 0", background: "#090909", borderBottom: "1px solid #0f0f0f" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                  <div style={{ width: isMobile ? "42px" : "50px", height: isMobile ? "42px" : "50px", borderRadius: "10px", background: phase.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? "19px" : "22px", color: "#000", fontWeight: "bold" }}>
                    {phase.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px", flexWrap: "wrap", marginBottom: "3px" }}>
                      <span style={{ fontSize: "8px", color: "#333", letterSpacing: "0.15em" }}>PHASE {phase.id} / 8</span>
                      <span style={{ fontSize: "8px", padding: "2px 6px", borderRadius: "3px", background: difficultyColors[phase.difficulty] + "18", color: difficultyColors[phase.difficulty], border: `1px solid ${difficultyColors[phase.difficulty]}28` }}>
                        {phase.difficulty.toUpperCase()}
                      </span>
                      <span style={{ fontSize: "8px", color: "#252525" }}>{phase.weeks}</span>
                    </div>
                    <div style={{ fontSize: isMobile ? "15px" : "19px", fontWeight: "bold", color: "#f0f0f0", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                      {isMobile ? phase.shortTitle : phase.title}
                    </div>
                    <div style={{ fontSize: "11px", color: phase.color, fontStyle: "italic", marginTop: "3px", opacity: 0.85 }}>
                      "{phase.tagline}"
                    </div>
                  </div>
                </div>
                {/* Phase progress */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ flex: 1, height: "2px", background: "#111", borderRadius: "1px" }}>
                    <div style={{ height: "100%", width: `${(phaseCheckedAccurate(activePhase)/phaseTotal(activePhase))*100}%`, background: phase.color, borderRadius: "1px", transition: "width 0.5s" }} />
                  </div>
                  <span style={{ fontSize: "9px", color: phase.color, flexShrink: 0 }}>
                    {phaseCheckedAccurate(activePhase)}/{phaseTotal(activePhase)} tasks
                  </span>
                </div>
                {/* Tabs */}
                <div style={{ display: "flex", overflowX: "auto", gap: "0", scrollbarWidth: "none" }}>
                  {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                      background: "transparent", border: "none",
                      borderBottom: activeTab === t.id ? `2px solid ${phase.color}` : "2px solid transparent",
                      color: activeTab === t.id ? phase.color : "#383838",
                      cursor: "pointer", padding: isMobile ? "7px 10px" : "8px 16px",
                      fontSize: isMobile ? "9px" : "10px", letterSpacing: "0.1em",
                      textTransform: "uppercase", fontFamily: "inherit",
                      transition: "color 0.12s", whiteSpace: "nowrap",
                      position: "relative",
                    }}>
                      {isMobile ? t.icon : `${t.icon} ${t.label}`}
                      {t.id === "resources" && (
                        <span style={{ position: "absolute", top: "5px", right: isMobile ? "3px" : "8px", width: "5px", height: "5px", borderRadius: "50%", background: phase.color }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: isMobile ? "18px 14px" : "28px 40px" }}>

                {/* ── OVERVIEW ── */}
                {activeTab === "overview" && (
                  <div style={{ animation: "fadeIn 0.18s ease" }}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: "8px", marginBottom: "24px" }}>
                      {[["Math Topics", phase.math.length, "∑"], ["HW Topics", phase.hardware.length, "⚙"], ["C Topics", phase.cpp.length, "C"], ["Resources", (resources ? Object.values(resources).flat().length : 0), "⬡"]].map(([label, val, icon]) => (
                        <div key={label} style={{ background: "#0a0a0a", border: "1px solid #111", borderRadius: "7px", padding: "12px 14px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                            <span style={{ fontSize: "8px", color: "#333", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>
                            <span style={{ fontSize: "11px", color: "#1a1a1a" }}>{icon}</span>
                          </div>
                          <div style={{ fontSize: "20px", fontWeight: "bold", color: phase.color }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <SectionLabel color={phase.color}>8-Step Pedagogical Framework</SectionLabel>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: "1px", background: "#111", border: "1px solid #111", borderRadius: "7px", overflow: "hidden", marginBottom: "24px" }}>
                      {[["01","Intuitive","Plain-language first principles"],["02","Formal","Mathematical derivations"],["03","Hardware","CPU & memory interpretation"],["04","C Code","Compilable implementations"],["05","Execution","Line-by-line traces"],["06","Complexity","Formal O/Θ/Ω analysis"],["07","Debugging","Error methodology"],["08","Optimize","Performance engineering"]].map(([num,title,desc]) => (
                        <div key={num} style={{ background: "#0a0a0a", padding: "12px 13px" }}>
                          <div style={{ fontSize: "8px", color: phase.color, opacity: 0.55, marginBottom: "3px" }}>STEP {num}</div>
                          <div style={{ fontSize: "11px", color: "#ccc", fontWeight: "bold", marginBottom: "2px" }}>{title}</div>
                          <div style={{ fontSize: "9px", color: "#3a3a3a", lineHeight: "1.4" }}>{desc}</div>
                        </div>
                      ))}
                    </div>
                    <SectionLabel color={phase.color}>Pedagogy Notes</SectionLabel>
                    <div style={{ marginBottom: "24px" }}>
                      {phase.pedagogy.map((note, i) => (
                        <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px 12px", marginBottom: "5px", background: "#0a0a0a", border: "1px solid #111", borderRadius: "6px" }}>
                          <span style={{ color: phase.color, fontSize: "9px", marginTop: "3px", flexShrink: 0 }}>▸</span>
                          <span style={{ fontSize: "12px", color: "#999", lineHeight: "1.6" }}>{note}</span>
                        </div>
                      ))}
                    </div>
                    <SectionLabel color={phase.color}>Jump to Phase</SectionLabel>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {phases.map((p, i) => (
                        <button key={p.id} onClick={() => selectPhase(i)} style={{
                          padding: "5px 10px", borderRadius: "4px", cursor: "pointer",
                          background: i === activePhase ? phase.color : "#0d0d0d",
                          border: `1px solid ${i === activePhase ? phase.color : "#181818"}`,
                          color: i === activePhase ? "#000" : "#444",
                          fontSize: "10px", fontFamily: "inherit", transition: "all 0.12s",
                        }}>
                          {p.icon} {p.shortTitle}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── RESOURCES ── */}
                {activeTab === "resources" && (
                  <div style={{ animation: "fadeIn 0.18s ease" }}>
                    {/* Resource header */}
                    <div style={{ marginBottom: "20px" }}>
                      <SectionLabel color={phase.color}>Free Learning Resources — Phase {phase.id}: {phase.shortTitle}</SectionLabel>
                      <div style={{ fontSize: "12px", color: "#444", lineHeight: "1.6", marginBottom: "16px" }}>
                        All resources below are free or freely auditable. Starred resources are the most highly recommended for this phase.
                      </div>
                      {/* Filter bar */}
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {["all","Courses","Books & Texts","Practice","Videos"].map(f => (
                          <button key={f} className="filterbtn" onClick={() => setResourceFilter(f)} style={{
                            padding: "5px 12px", borderRadius: "4px", cursor: "pointer",
                            background: resourceFilter === f ? phase.color : "#0d0d0d",
                            border: `1px solid ${resourceFilter === f ? phase.color : "#1a1a1a"}`,
                            color: resourceFilter === f ? "#000" : "#555",
                            fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase",
                            fontFamily: "inherit", transition: "all 0.15s",
                            opacity: resourceFilter === f ? 1 : 0.7,
                          }}>
                            {f === "all" ? `All (${allResources.length})` : `${f} (${allResources.filter(r=>r.category===f).length})`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Resources grouped */}
                    {resourceFilter === "all" ? (
                      ["Courses","Books & Texts","Practice","Videos"].map(cat => {
                        const items = allResources.filter(r => r.category === cat);
                        if (!items.length) return null;
                        const catIcons = { "Courses": "▶", "Books & Texts": "◫", "Practice": "◆", "Videos": "⬡" };
                        return (
                          <div key={cat} style={{ marginBottom: "28px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                              <span style={{ fontSize: "11px", color: phase.color }}>{catIcons[cat]}</span>
                              <span style={{ fontSize: "9px", color: "#444", letterSpacing: "0.15em", textTransform: "uppercase" }}>{cat}</span>
                              <div style={{ flex: 1, height: "1px", background: "#111" }} />
                              <span style={{ fontSize: "9px", color: "#2a2a2a" }}>{items.length}</span>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "8px" }}>
                              {items.map((item, i) => <ResourceCard key={i} item={item} color={phase.color} />)}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "8px" }}>
                        {filteredResources.map((item, i) => <ResourceCard key={i} item={item} color={phase.color} />)}
                      </div>
                    )}

                    {/* Cross-phase essentials */}
                    <div style={{ marginTop: "32px", padding: "20px", background: "#0a0a0a", border: `1px solid ${phase.color}22`, borderRadius: "8px" }}>
                      <SectionLabel color={phase.color}>Universal Resources (All Phases)</SectionLabel>
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "8px" }}>
                        {[
                          { name: "Teach Yourself CS (curated roadmap)", url: "https://teachyourselfcs.com/", tag: "Free" },
                          { name: "CS DIY Wiki — full self-study guide", url: "https://csdiy.wiki/en/", tag: "Free" },
                          { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", tag: "MIT OCW" },
                          { name: "GeeksforGeeks — full CS reference", url: "https://www.geeksforgeeks.org/", tag: "Practice" },
                          { name: "Paul Graham's essays on programming", url: "http://www.paulgraham.com/articles.html", tag: "Blog" },
                          { name: "Class Central — free course catalog", url: "https://www.classcentral.com/", tag: "Free" },
                        ].map((item, i) => <ResourceCard key={i} item={item} color={phase.color} />)}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── MATH ── */}
                {activeTab === "math" && (
                  <div style={{ animation: "fadeIn 0.18s ease" }}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px" }}>
                      <div>
                        <SectionLabel color={phase.color}>Mathematical Curriculum</SectionLabel>
                        <TopicList items={phase.math} color={phase.color} />
                      </div>
                      <div>
                        <SectionLabel color={phase.color}>Hardware Foundations</SectionLabel>
                        <TopicList items={phase.hardware} color={phase.color} />
                      </div>
                    </div>
                    <CodeBlock color={phase.color} title="Per-Concept Requirements:" mt={24}>
{`FOR EACH concept in this phase:
  1. State definition formally (LaTeX notation)
  2. Prove from axioms where applicable
  3. Show worked example computed by hand
  4. Connect to hardware representation
  5. Connect to C language behavior
  6. Analyze computational complexity
  7. Identify edge cases and failure modes`}
                    </CodeBlock>
                  </div>
                )}

                {/* ── SYSTEMS ── */}
                {activeTab === "systems" && (
                  <div style={{ animation: "fadeIn 0.18s ease" }}>
                    <SectionLabel color={phase.color}>C Systems Programming Topics</SectionLabel>
                    <TopicList items={phase.cpp} color={phase.color} />
                    <CodeBlock color={phase.color} title="Every C Implementation Must:" mt={22}>
{`/* Compile: gcc -Wall -Wextra -O2 -g -fsanitize=address */
/* Requirements per file:
   ─ Stack vs heap annotations per variable
   ─ Pointer ownership comments
   ─ Cache and performance implications
   ─ Common error modes with examples
   ─ Memory safety checklist
   ─ Execution trace walkthrough
   ─ Stack frame diagrams (ASCII)
   ─ Formal complexity analysis
   ─ Debugging section with intentional bugs */`}
                    </CodeBlock>
                    <div style={{ marginTop: "22px" }}>
                      <SectionLabel color={phase.color}>Required Diagrams Per Concept</SectionLabel>
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: "7px" }}>
                        {["ASCII memory layout","Stack frame diagrams","Heap allocation maps","Pointer chain visuals","Recursion trees","Cache line diagrams","Register walkthroughs","Execution flow traces"].map(d => (
                          <div key={d} style={{ padding: "9px 11px", background: "#0a0a0a", border: "1px solid #111", borderRadius: "5px", fontSize: "10px", color: "#555" }}>
                            <span style={{ color: phase.color, marginRight: "7px" }}>▸</span>{d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── PROJECTS ── */}
                {activeTab === "projects" && (
                  <div style={{ animation: "fadeIn 0.18s ease" }}>
                    <SectionLabel color={phase.color}>Phase {phase.id} Build Projects</SectionLabel>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px", marginBottom: "28px" }}>
                      {phase.projects.map(proj => (
                        <div key={proj.letter} style={{ background: "#0a0a0a", border: "1px solid #131313", borderTop: `2px solid ${phase.color}`, borderRadius: "9px", padding: "18px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "14px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "6px", background: phase.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold", fontSize: "12px" }}>{proj.letter}</div>
                            <div style={{ fontSize: "13px", color: "#f0f0f0", fontWeight: "bold" }}>{proj.name}</div>
                          </div>
                          {proj.items.map(item => (
                            <div key={item} style={{ display: "flex", gap: "9px", alignItems: "flex-start", padding: "6px 0", borderBottom: "1px solid #0f0f0f", fontSize: "11px", color: "#666" }}>
                              <span style={{ color: phase.color, flexShrink: 0 }}>✓</span>{item}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <SectionLabel color={phase.color}>Capstone Scale Projects</SectionLabel>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "9px" }}>
                      {capstoneProjects.map(c => (
                        <div key={c.name} style={{ display: "flex", gap: "11px", padding: "12px 14px", background: "#0a0a0a", border: "1px solid #111", borderRadius: "6px" }}>
                          <span style={{ fontSize: "16px", color: c.color }}>{c.icon}</span>
                          <div>
                            <div style={{ fontSize: "11px", color: "#ccc", fontWeight: "bold", marginBottom: "2px" }}>{c.name}</div>
                            <div style={{ fontSize: "10px", color: "#383838" }}>{c.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── MASTERY ── */}
                {activeTab === "mastery" && (
                  <div style={{ animation: "fadeIn 0.18s ease" }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", padding: "12px 14px", background: "#0a0a0a", border: `1px solid ${phase.color}20`, borderRadius: "7px", marginBottom: "20px" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0, background: "#0d0d0d", border: `2px solid ${phase.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold", color: phase.color }}>
                        {Math.round((phaseCheckedAccurate(activePhase)/phaseTotal(activePhase))*100)}%
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#f0f0f0", fontWeight: "bold" }}>Phase {phase.id} Mastery</div>
                        <div style={{ fontSize: "10px", color: "#444" }}>{phaseCheckedAccurate(activePhase)} of {phaseTotal(activePhase)} complete — click to toggle</div>
                      </div>
                    </div>
                    {Object.entries(phase.checklist).map(([section, items]) => (
                      <div key={section} style={{ marginBottom: "24px" }}>
                        <SectionLabel color={phase.color}>
                          {section === "theory" ? "Theory Mastery" : section === "programming" ? "Programming Mastery" : "Engineering Mastery"}
                        </SectionLabel>
                        {items.map(item => {
                          const key = `${phase.id}-${section}-${item}`;
                          const checked = checkedItems[key];
                          return (
                            <div key={item} onClick={() => toggleCheck(key)} style={{
                              display: "flex", gap: "11px", alignItems: "flex-start",
                              padding: "10px 13px", marginBottom: "5px",
                              background: checked ? phase.darkColor : "#0a0a0a",
                              border: `1px solid ${checked ? phase.color + "40" : "#111"}`,
                              borderRadius: "6px", cursor: "pointer", transition: "all 0.16s",
                            }}>
                              <div style={{ width: "16px", height: "16px", borderRadius: "3px", flexShrink: 0, border: `1.5px solid ${checked ? phase.color : "#252525"}`, background: checked ? phase.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#000", transition: "all 0.16s" }}>
                                {checked ? "✓" : ""}
                              </div>
                              <span style={{ fontSize: "12px", color: checked ? "#666" : "#bbb", textDecoration: checked ? "line-through" : "none", lineHeight: "1.5" }}>{item}</span>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}

                {/* ── CHALLENGES ── */}
                {activeTab === "challenges" && (
                  <div style={{ animation: "fadeIn 0.18s ease" }}>
                    <SectionLabel color={phase.color}>Graduate-Level Challenge Problems</SectionLabel>
                    <div style={{ marginBottom: "28px" }}>
                      {phase.challenges.map((c, i) => (
                        <div key={i} style={{ padding: "16px 18px", marginBottom: "9px", background: "#0a0a0a", border: "1px solid #111", borderLeft: `3px solid ${phase.color}`, borderRadius: "0 7px 7px 0" }}>
                          <div style={{ display: "flex", gap: "11px", alignItems: "flex-start" }}>
                            <div style={{ fontSize: "8px", color: phase.color, background: phase.darkColor, border: `1px solid ${phase.color}40`, borderRadius: "3px", padding: "2px 6px", flexShrink: 0, marginTop: "3px", fontWeight: "bold" }}>#{i+1}</div>
                            <span style={{ fontSize: "12px", color: "#ccc", lineHeight: "1.7" }}>{c}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <SectionLabel color={phase.color}>Mini Exam Format</SectionLabel>
                    <div style={{ background: "#0a0a0a", border: "1px solid #111", borderRadius: "9px", overflow: "hidden", marginBottom: "28px" }}>
                      {[["Written","Mathematical proofs and derivations, closed notes","45 min"],["Implement","Write a complete C program from scratch","90 min"],["Debug","Find and fix 5 bugs in provided code","45 min"],["Optimize","Improve solution by ≥2× measured speedup","60 min"],["Design","Architect a system with given constraints","30 min"]].map(([type,desc,time],i,arr) => (
                        <div key={type} style={{ display: "flex", alignItems: "flex-start", padding: "12px 16px", gap: "12px", borderBottom: i < arr.length-1 ? "1px solid #0f0f0f" : "none" }}>
                          <div style={{ fontSize: "8px", color: "#000", background: phase.color, borderRadius: "3px", padding: "2px 7px", flexShrink: 0, marginTop: "2px", fontWeight: "bold" }}>{type.toUpperCase()}</div>
                          <div style={{ flex: 1, fontSize: "11px", color: "#888" }}>{desc}</div>
                          <div style={{ fontSize: "9px", color: "#333", flexShrink: 0 }}>{time}</div>
                        </div>
                      ))}
                    </div>
                    <SectionLabel color={phase.color}>All Phase Challenges</SectionLabel>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "9px" }}>
                      {phases.map(p => (
                        <button key={p.id} onClick={() => selectPhase(p.id-1)} style={{
                          background: p.id-1===activePhase ? p.color+"12" : "#0a0a0a",
                          border: `1px solid ${p.id-1===activePhase ? p.color+"40" : "#111"}`,
                          borderRadius: "6px", padding: "11px 13px", cursor: "pointer",
                          textAlign: "left", fontFamily: "inherit", transition: "all 0.15s",
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                            <span style={{ fontSize: "10px", color: p.id-1===activePhase ? p.color : "#444", fontWeight: "bold" }}>{p.icon} Phase {p.id} — {p.shortTitle}</span>
                            <span style={{ fontSize: "9px", color: "#2a2a2a" }}>{p.challenges.length} problems</span>
                          </div>
                          <div style={{ fontSize: "9px", color: "#333", lineHeight: "1.4" }}>{p.challenges[0].slice(0,58)}…</div>
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
    </div>
  );
}

/* ── SHARED COMPONENTS ───────────────────────────────────────────────────── */
function SectionLabel({ children, color }) {
  return (
    <div style={{ fontSize: "8px", color, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px", display: "flex", alignItems: "center", gap: "7px" }}>
      <div style={{ width: "16px", height: "1px", background: color, opacity: 0.5 }} />
      {children}
      <div style={{ flex: 1, height: "1px", background: "#0f0f0f" }} />
    </div>
  );
}

function TopicList({ items, color }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "11px", alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid #0d0d0d" }}>
          <span style={{ color, flexShrink: 0, fontSize: "8px", marginTop: "4px" }}>▸</span>
          <span style={{ fontSize: "12px", color: "#999", lineHeight: "1.5" }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ children, title, color, mt = 0 }) {
  return (
    <div style={{ marginTop: mt }}>
      {title && <div style={{ fontSize: "8px", color: "#2e2e2e", letterSpacing: "0.12em", marginBottom: "5px", textTransform: "uppercase" }}>{title}</div>}
      <pre style={{ background: "#050505", border: "1px solid #111", borderLeft: `2px solid ${color}`, borderRadius: "0 7px 7px 0", padding: "16px 20px", fontSize: "11px", color: "#484848", lineHeight: "1.9", overflowX: "auto", margin: 0, fontFamily: "'Courier New', Menlo, monospace" }}>
        {children}
      </pre>
    </div>
  );
}
