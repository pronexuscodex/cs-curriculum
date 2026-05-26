import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   INJECT GLOBAL CSS — animations, fonts, custom cursor, scrollbar
═══════════════════════════════════════════════════════════════ */
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
      
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: #060606; }
      ::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 2px; }
      ::-webkit-scrollbar-thumb:hover { background: #2e2e2e; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; } to { opacity: 1; }
      }
      @keyframes slideRight {
        from { transform: scaleX(0); transform-origin: left; }
        to   { transform: scaleX(1); transform-origin: left; }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; } 50% { opacity: 0; }
      }

      @keyframes pulse-ring {
        0%   { transform: scale(0.8); opacity: 0.8; }
        100% { transform: scale(1.6); opacity: 0; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-8px); }
      }
      @keyframes ticker {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes glitch1 {
        0%, 100% { clip-path: inset(0 0 95% 0); transform: translateX(-2px); }
        20%       { clip-path: inset(30% 0 50% 0); transform: translateX(2px); }
        40%       { clip-path: inset(60% 0 20% 0); transform: translateX(-1px); }
        60%       { clip-path: inset(80% 0 5% 0); transform: translateX(1px); }
        80%       { clip-path: inset(10% 0 80% 0); transform: translateX(-2px); }
      }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

      .fade-up { animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
      .stagger-1 { animation-delay: 0.05s; }
      .stagger-2 { animation-delay: 0.12s; }
      .stagger-3 { animation-delay: 0.20s; }
      .stagger-4 { animation-delay: 0.28s; }
      .stagger-5 { animation-delay: 0.36s; }

      .phase-btn:hover .phase-glow {
        opacity: 1 !important;
      }

      .tab-btn { position: relative; overflow: hidden; }
      .tab-btn::after {
        content: ''; position: absolute; bottom: 0; left: 0; right: 0;
        height: 2px; background: currentColor; transform: scaleX(0);
        transition: transform 0.2s ease;
      }
      .tab-btn.active::after { transform: scaleX(1); }

      .resource-card { transition: all 0.22s cubic-bezier(0.4,0,0.2,1); }
      .resource-card:hover { transform: translateY(-2px); }

      .check-item { transition: all 0.18s ease; }
      .check-item:hover { transform: translateX(3px); }

      .cmd-overlay { animation: fadeIn 0.15s ease; }
      .cmd-modal { animation: fadeUp 0.2s cubic-bezier(0.16,1,0.3,1); }

      @keyframes celebratePop {
        0%   { transform: scale(1); }
        35%  { transform: scale(1.18); }
        60%  { transform: scale(0.93); }
        80%  { transform: scale(1.06); }
        100% { transform: scale(1); }
      }
      @keyframes confettiFall {
        0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(40px) rotate(360deg); opacity: 0; }
      }
      @keyframes nudgePulse {
        0%, 100% { box-shadow: 0 0 0 0 transparent; }
        50% { box-shadow: 0 0 0 3px rgba(200,245,66,0.25); }
      }
      @keyframes streakGlow {
        0%, 100% { text-shadow: 0 0 0 transparent; }
        50% { text-shadow: 0 0 12px #C8F54288; }
      }
      .celebrate { animation: celebratePop 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
      .check-item:hover { transform: translateX(3px); }
      .check-item-done { border-color: var(--accent-color) !important; }
      .tab-btn-inactive { opacity: 0.6; }
      .tab-btn-inactive:hover { opacity: 1; }
      .phase-nav-btn:hover { background: rgba(255,255,255,0.04) !important; }
      .phase-nav-btn:hover .phase-nav-name { color: #fff !important; }
      .resource-top { border-top: 2px solid var(--accent) !important; }
      .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,245,66,0.25) !important; }
      .cta-secondary:hover { border-color: #555 !important; color: #aaa !important; }

      /* scanline removed */
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const resourcesByPhase = {
  1: {
    courses: [
      { name: "MIT 6.042J — Mathematics for Computer Science", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/", tag: "MIT OCW", free: true, stars: 5 },
      { name: "CS50x — Harvard's Intro to Computer Science", url: "https://cs50.harvard.edu/x/", tag: "Harvard", free: true, stars: 5 },
      { name: "Trefor Bazett: Discrete Math Full Course", url: "https://www.youtube.com/watch?v=rdXw7Ps9vxc&list=PLHXZ9OQGMqxersk8fUxiUMSIx0DBqsKZS", tag: "YouTube", free: true, stars: 5 },
      { name: "MIT 6.042 Full Lecture Series", url: "https://www.youtube.com/playlist?list=PLB7540DEDD482705B", tag: "YouTube", free: true, stars: 4 },
      { name: "Khan Academy: Logic & Proofs", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:logic", tag: "Khan", free: true, stars: 4 },
    ],
    books: [
      { name: "Discrete Math: An Open Introduction (free PDF)", url: "https://discrete.openmathbooks.org/", tag: "Free Book" },
      { name: "A Cool Brisk Walk Through Discrete Math", url: "https://www.allthemath.org/", tag: "Free Book" },
      { name: "MIT 6.042J Lecture Notes", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/pages/readings/", tag: "Free Notes" },
    ],
    practice: [
      { name: "GeeksforGeeks: Discrete Mathematics Tutorial", url: "https://www.geeksforgeeks.org/engineering-mathematics/discrete-mathematics-tutorial/", tag: "Practice" },
      { name: "VisuAlgo — Algorithm Visualizer", url: "https://visualgo.net/", tag: "Visual" },
    ],
    videos: [
      { name: "MIT 6.042 Fall 2010 Full Lectures", url: "https://www.youtube.com/playlist?list=PLB7540DEDD482705B", tag: "YouTube" },
      { name: "Trefor Bazett: Discrete Math", url: "https://www.youtube.com/watch?v=rdXw7Ps9vxc&list=PLHXZ9OQGMqxersk8fUxiUMSIx0DBqsKZS", tag: "YouTube" },
    ],
  },
  2: {
    courses: [
      { name: "MIT 6.096 — Introduction to C & C++", url: "https://ocw.mit.edu/courses/6-s096-introduction-to-c-and-c-january-iap-2013/", tag: "MIT OCW", free: true, stars: 5 },
      { name: "MIT 6.087 — Practical Programming in C", url: "https://ocw.mit.edu/courses/6-087-practical-programming-in-c-january-iap-2010/", tag: "MIT OCW", free: true, stars: 5 },
      { name: "CS50x — Psets 3–5: Memory & Data Structures", url: "https://cs50.harvard.edu/x/", tag: "Harvard", free: true, stars: 5 },
      { name: "Jacob Sorber: C Programming Series", url: "https://www.youtube.com/c/JacobSorber", tag: "YouTube", free: true, stars: 4 },
      { name: "CS Circles (Waterloo) — C Exercises", url: "https://cscircles.cemc.uwaterloo.ca/", tag: "Waterloo", free: true, stars: 4 },
    ],
    books: [
      { name: "Beej's Guide to C Programming (free)", url: "https://beej.us/guide/bgc/", tag: "Free Book" },
      { name: "Build Your Own Lisp", url: "http://www.buildyourownlisp.com/", tag: "Free Book" },
    ],
    practice: [
      { name: "VisuAlgo: Graph Traversal Visualizer", url: "https://visualgo.net/en/graphds", tag: "Visual" },
      { name: "GeeksforGeeks: Graph Algorithms", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/", tag: "Practice" },
    ],
    videos: [
      { name: "Jacob Sorber: C Pointers Deep Dive", url: "https://www.youtube.com/c/JacobSorber", tag: "YouTube" },
      { name: "Low Level Learning", url: "https://www.youtube.com/@LowLevelLearning", tag: "YouTube" },
    ],
  },
  3: {
    courses: [
      { name: "MIT 6.006 — Introduction to Algorithms", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", tag: "MIT OCW", free: true, stars: 5 },
      { name: "MIT 6.046J — Design & Analysis of Algorithms", url: "https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/", tag: "MIT OCW", free: true, stars: 5 },
      { name: "UC Berkeley CS61B — Data Structures", url: "https://datastructur.es/", tag: "Berkeley", free: true, stars: 5 },
      { name: "Abdul Bari: Algorithms Full Course", url: "https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O", tag: "YouTube", free: true, stars: 5 },
      { name: "Stanford Algorithms — Tim Roughgarden", url: "https://www.youtube.com/playlist?list=PLXFMmlk03Dt7Q0xr1PIAriY5623cKiH7V", tag: "YouTube", free: true, stars: 5 },
    ],
    books: [
      { name: "Open Data Structures (free PDF)", url: "https://opendatastructures.org/", tag: "Free Book" },
      { name: "CLRS — Introduction to Algorithms", url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/", tag: "Textbook" },
    ],
    practice: [
      { name: "LeetCode (free tier)", url: "https://leetcode.com/", tag: "Practice" },
      { name: "VisuAlgo — Trees, Sorting, Graphs", url: "https://visualgo.net/", tag: "Visual" },
      { name: "HackerRank: Data Structures Track", url: "https://www.hackerrank.com/domains/data-structures", tag: "Practice" },
      { name: "USACO Training", url: "https://train.usaco.org/", tag: "Competitive" },
    ],
    videos: [
      { name: "MIT 6.006 Fall 2011 Full Lectures", url: "https://www.youtube.com/playlist?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb", tag: "YouTube" },
      { name: "Abdul Bari: Algorithms Full Course", url: "https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O", tag: "YouTube" },
    ],
  },
  4: {
    courses: [
      { name: "CMU 15-213 — Intro to Computer Systems (CSAPP)", url: "https://www.cs.cmu.edu/~213/", tag: "CMU", free: true, stars: 5 },
      { name: "Nand2Tetris — Build a Computer from NAND", url: "https://www.nand2tetris.org/", tag: "Free", free: true, stars: 5 },
      { name: "Berkeley CS162 — Operating Systems", url: "https://cs162.org/", tag: "Berkeley", free: true, stars: 5 },
      { name: "MIT 6.004 — Computation Structures", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", tag: "MIT OCW", free: true, stars: 5 },
      { name: "CMU Computer Architecture Full Lectures", url: "https://www.youtube.com/playlist?list=PL5PHm2jkkXmidJOd59REog9jDnPDTG6IJ", tag: "YouTube", free: true, stars: 5 },
    ],
    books: [
      { name: "Operating Systems: Three Easy Pieces (free PDF)", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/", tag: "Free Book" },
      { name: "xv6 — MIT's Teaching OS (free)", url: "https://pdos.csail.mit.edu/6.828/2023/xv6.html", tag: "Free OS" },
      { name: "CS:APP — Computer Systems", url: "https://csapp.cs.cmu.edu/", tag: "Textbook" },
    ],
    practice: [
      { name: "CSAPP Labs — bomb lab, buffer overflow, malloc", url: "https://csapp.cs.cmu.edu/3e/labs.html", tag: "Labs" },
      { name: "OSDev Wiki — Write an OS from scratch", url: "https://wiki.osdev.org/", tag: "Reference" },
    ],
    videos: [
      { name: "MIT 6.828 OS Engineering Full Lectures", url: "https://www.youtube.com/watch?v=y2oy-mRQlGE&list=PLfciLKR3SgqNJKKIKUliWoNBBH1Vhl-xD", tag: "YouTube" },
      { name: "Low Level Learning: OS Development Series", url: "https://www.youtube.com/@LowLevelLearning", tag: "YouTube" },
    ],
  },
  5: {
    courses: [
      { name: "MIT 6.824 — Distributed Systems", url: "https://pdos.csail.mit.edu/6.824/", tag: "MIT", free: true, stars: 5 },
      { name: "Stanford CS144 — Computer Networks", url: "https://cs144.github.io/", tag: "Stanford", free: true, stars: 5 },
      { name: "Cambridge: Distributed Systems — 8 Lectures", url: "https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB", tag: "YouTube", free: true, stars: 5 },
      { name: "Distributed Systems Course (free website)", url: "https://www.distributedsystemscourse.com/", tag: "Free", free: true, stars: 4 },
    ],
    books: [
      { name: "Beej's Guide to Network Programming (free)", url: "https://beej.us/guide/bgnet/", tag: "Free Book" },
      { name: "Distributed Systems — Tanenbaum (free PDF)", url: "https://www.distributed-systems.net/index.php/books/ds3/", tag: "Free Book" },
      { name: "Designing Data-Intensive Applications", url: "https://dataintensive.net/", tag: "Textbook" },
    ],
    practice: [
      { name: "MIT 6.824 Labs — Raft, MapReduce, KV Store", url: "https://pdos.csail.mit.edu/6.824/labs/lab-mr.html", tag: "Labs" },
      { name: "PingCAP Talent Plan: Distributed Systems in Rust", url: "https://github.com/pingcap/talent-plan", tag: "GitHub" },
    ],
    videos: [
      { name: "MIT 6.824 Spring 2020 Full Lectures", url: "https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB", tag: "YouTube" },
      { name: "Martin Kleppmann: Distributed Systems Lectures", url: "https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB", tag: "YouTube" },
    ],
  },
  6: {
    courses: [
      { name: "Stanford Compilers — Alex Aiken (YouTube)", url: "https://www.youtube.com/watch?v=sm0QQO-WZlM&list=PLTW_jEXtShYJVZr3fIXkr9LVE6IVpqOmS", tag: "YouTube", free: true, stars: 5 },
      { name: "Cornell CS6120 — Advanced Compilers (open)", url: "https://www.cs.cornell.edu/courses/cs6120/2020fa/", tag: "Cornell", free: true, stars: 5 },
      { name: "Udacity: Programming Languages (free)", url: "https://www.udacity.com/course/programming-languages--cs262", tag: "Udacity", free: true, stars: 4 },
    ],
    books: [
      { name: "Crafting Interpreters — Bob Nystrom (free online)", url: "https://www.craftinginterpreters.com/", tag: "Free Book" },
      { name: "Build Your Own Lisp — learn C by writing Lisp", url: "http://www.buildyourownlisp.com/", tag: "Free Book" },
      { name: "SICP — Structure and Interpretation of Computer Programs", url: "https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html", tag: "Free Book" },
    ],
    practice: [
      { name: "LLVM Tutorial — Building a JIT Compiler", url: "https://llvm.org/docs/tutorial/", tag: "Tutorial" },
      { name: "Matt Might's Blog: Compilers & PLs", url: "https://matt.might.net/articles/", tag: "Blog" },
    ],
    videos: [
      { name: "Stanford Compilers Full Lecture Series", url: "https://www.youtube.com/watch?v=sm0QQO-WZlM&list=PLTW_jEXtShYJVZr3fIXkr9LVE6IVpqOmS", tag: "YouTube" },
      { name: "Tsoding: Writing a Programming Language in C", url: "https://www.youtube.com/@tsoding", tag: "YouTube" },
    ],
  },
  7: {
    courses: [
      { name: "CMU 15-445 — Introduction to Database Systems", url: "https://15445.courses.cs.cmu.edu/", tag: "CMU", free: true, stars: 5 },
      { name: "CMU 15-721 — Advanced Database Systems", url: "https://15721.courses.cs.cmu.edu/", tag: "CMU", free: true, stars: 5 },
      { name: "UC Berkeley CS186 — Intro to Database Systems", url: "https://cs186berkeley.net/", tag: "Berkeley", free: true, stars: 5 },
    ],
    books: [
      { name: "Readings in Database Systems — The Red Book (free)", url: "http://www.redbook.io/", tag: "Free Book" },
      { name: "Modern B-Tree Techniques (free research paper)", url: "https://w6113.github.io/files/papers/btreesurvey-graefe.pdf", tag: "Free Paper" },
      { name: "Designing Data-Intensive Applications", url: "https://dataintensive.net/", tag: "Textbook" },
    ],
    practice: [
      { name: "CMU 15-445 BusTub Labs (GitHub)", url: "https://github.com/cmu-db/bustub", tag: "GitHub Labs" },
      { name: "Build Your Own SQLite (CodeCrafters)", url: "https://app.codecrafters.io/courses/sqlite/overview", tag: "Tutorial" },
    ],
    videos: [
      { name: "CMU 15-445 Full Lecture Videos", url: "https://www.youtube.com/playlist?list=PLSE8ODhjZXjbj8BMuIrRcacnQh20hmY9g", tag: "YouTube" },
      { name: "Andy Pavlo: Database Internals Talks", url: "https://www.youtube.com/@CMUDatabaseGroup", tag: "YouTube" },
    ],
  },
  8: {
    courses: [
      { name: "Dan Boneh: Cryptography I (YouTube lectures)", url: "https://www.youtube.com/watch?v=2aHkqB2-46k&list=PL9oqNDMzcMClAPkp4pne89hWBFGmhw29Y", tag: "YouTube", free: true, stars: 5 },
      { name: "pwn.college — Binary Exploitation (fully free)", url: "https://pwn.college/", tag: "Free", free: true, stars: 5 },
      { name: "Cryptopals Challenges (free, self-paced)", url: "https://cryptopals.com/", tag: "Free", free: true, stars: 5 },
      { name: "OverTheWire: Wargames (free)", url: "https://overthewire.org/wargames/", tag: "Free Labs", free: true, stars: 5 },
      { name: "OpenSecurityTraining2 — Free OS Security Courses", url: "https://opensecuritytraining.info/", tag: "Free", free: true, stars: 4 },
    ],
    books: [
      { name: "A Graduate Course in Applied Cryptography (free PDF)", url: "https://toc.cryptobook.us/", tag: "Free Book" },
      { name: "Serious Cryptography — Jean-Philippe Aumasson", url: "https://nostarch.com/seriouscrypto", tag: "Textbook" },
    ],
    practice: [
      { name: "CryptoHack.org — Cryptography Challenges", url: "https://cryptohack.org/", tag: "Practice" },
      { name: "picoCTF — Free CTF Platform for Beginners", url: "https://picoctf.org/", tag: "CTF" },
      { name: "CTFtime.org — CTF Competition Calendar", url: "https://ctftime.org/", tag: "CTF" },
    ],
    videos: [
      { name: "LiveOverflow: Hacking & Binary Exploitation", url: "https://www.youtube.com/@LiveOverflow", tag: "YouTube" },
      { name: "Dan Boneh: Cryptography Full Lecture Series", url: "https://www.youtube.com/watch?v=2aHkqB2-46k&list=PL9oqNDMzcMClAPkp4pne89hWBFGmhw29Y", tag: "YouTube" },
    ],
  },
};

const phases = [
  {
    id:1, title:"Mathematical Logic, Binary Systems & Foundations", shortTitle:"Math & Logic",
    color:"#C8F542", darkColor:"#111a00", icon:"∴", tagline:"From transistors to truth — where computation is born",
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
    color:"#42C8F5", darkColor:"#001519", icon:"→", tagline:"The machine's memory is yours to command",
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
    color:"#F5A742", darkColor:"#1a1000", icon:"Θ", tagline:"Measure everything — nothing is free",
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
    color:"#F542A7", darkColor:"#1a0011", icon:"⚙", tagline:"The OS is just software — so build one",
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
    color:"#A742F5", darkColor:"#0f0019", icon:"⇌", tagline:"Networks fail — design for it",
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
    color:"#F5E242", darkColor:"#1a1a00", icon:"λ", tagline:"Languages are just programs — write one",
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
    color:"#42F5C8", darkColor:"#001a14", icon:"⊕", tagline:"Data outlives code — store it right",
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
    color:"#F55442", darkColor:"#1a0400", icon:"⚿", tagline:"The attacker reads your code — so should you",
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
  "Foundations": { color:"#C8F542", bg:"#111a00" },
  "Intermediate": { color:"#42C8F5", bg:"#001519" },
  "Advanced":    { color:"#F5A742", bg:"#1a1000" },
  "Expert":      { color:"#F55442", bg:"#1a0400" },
};

const tagColors = {
  "MIT OCW":"#42C8F5","CMU":"#F55442","Stanford":"#F5E242","Berkeley":"#F5A742",
  "Harvard":"#ff6b6b","Khan":"#42F5C8","Waterloo":"#F5A742",
  "Free Book":"#C8F542","Free":"#C8F542","Free Labs":"#C8F542","Free Notes":"#C8F542",
  "Free Paper":"#C8F542","Free OS":"#C8F542","Free Chapters":"#C8F542",
  "YouTube":"#FF4444","MIT":"#42C8F5","Cornell":"#F5E242","Udacity":"#42C8F5",
  "Practice":"#888","Visual":"#888","Interactive":"#888","Blog":"#888",
  "Tutorial":"#F5A742","GitHub":"#888","GitHub Labs":"#F5A742","Labs":"#F5A742",
  "Open Source":"#888","Textbook":"#666","Classic":"#666","CTF":"#F55442",
  "Competitive":"#F55442","Reference":"#888",
};

/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */
function useWindowSize() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1400);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function useTypewriter(text, speed = 40, startDelay = 200) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    const t0 = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t0);
  }, [text]);
  return { displayed, done };
}

/* ═══════════════════════════════════════════════════════════════
   CURSOR GLOW
═══════════════════════════════════════════════════════════════ */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div style={{
      position: "fixed", pointerEvents: "none", zIndex: 0,
      left: pos.x - 200, top: pos.y - 200,
      width: 400, height: 400, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(200,245,66,0.04) 0%, transparent 70%)",
      transition: "left 0.08s ease, top 0.08s ease",
    }} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMMAND PALETTE
═══════════════════════════════════════════════════════════════ */
function CommandPalette({ phases, onPhase, onClose, checkedItems }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const commands = [
    ...phases.map(p => ({
      label: `Phase ${p.id} — ${p.shortTitle}`,
      sub: p.title, icon: p.icon, color: p.color,
      action: () => { onPhase(p.id - 1); onClose(); }
    })),
    { label: "Home", sub: "Back to landing page", icon: "◉", color: "#888", action: onClose },
  ];

  const filtered = query
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || c.sub.toLowerCase().includes(query.toLowerCase()))
    : commands;

  return (
    <div className="cmd-overlay" onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      zIndex: 2000, display: "flex", alignItems: "flex-start",
      justifyContent: "center", paddingTop: "15vh",
      backdropFilter: "blur(8px)",
    }}>
      <div className="cmd-modal" onClick={e => e.stopPropagation()} style={{
        width: "min(560px, 90vw)",
        background: "#080808", border: "1px solid #2a2a2a",
        borderRadius: "8px", overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px #C8F54222",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderBottom: "1px solid #141414" }}>
          <span style={{ fontSize: "14px", color: "#444" }}>⌘</span>
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search phases, topics..."
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "#e0e0e0", fontSize: "14px", fontFamily: "'DM Mono', 'Courier New', monospace",
            }} />
          <span style={{ fontSize: "10px", color: "#333", fontFamily: "'DM Mono', monospace", border: "1px solid #222", padding: "2px 6px", borderRadius: "3px" }}>ESC</span>
        </div>
        <div style={{ maxHeight: "360px", overflowY: "auto" }}>
          {filtered.map((cmd, i) => (
            <div key={i} onClick={cmd.action} style={{
              display: "flex", alignItems: "center", gap: "14px",
              padding: "12px 16px", cursor: "pointer",
              borderBottom: "1px solid #0d0d0d",
              transition: "background 0.1s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#111"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{
                width: "30px", height: "30px", background: cmd.color + "18",
                border: `1px solid ${cmd.color}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", color: cmd.color, flexShrink: 0,
                fontFamily: "'DM Serif Display', Georgia, serif",
              }}>{cmd.icon}</div>
              <div>
                <div style={{ fontSize: "13px", color: "#ddd", fontWeight: "500" }}>{cmd.label}</div>
                <div style={{ fontSize: "11px", color: "#777", marginTop: "1px", fontFamily: "'DM Mono', monospace" }}>{cmd.sub}</div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "24px", textAlign: "center", color: "#666", fontSize: "13px", fontFamily: "'DM Mono', monospace" }}>
              No results for "{query}"
            </div>
          )}
        </div>
        <div style={{ padding: "10px 16px", borderTop: "1px solid #0d0d0d", display: "flex", gap: "16px" }}>
          {[["↑↓", "navigate"], ["↵", "select"], ["esc", "close"]].map(([k, v]) => (
            <span key={k} style={{ fontSize: "10px", color: "#888", fontFamily: "'DM Mono', monospace" }}>
              <span style={{ color: "#ccc", background: "#1a1a1a", border: "1px solid #333", padding: "1px 5px", borderRadius: "2px", marginRight: "5px" }}>{k}</span>{v}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROGRESS RING
═══════════════════════════════════════════════════════════════ */
function ProgressRing({ pct, size = 38, stroke = 2.5, color = "#C8F542", label }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a1a1a" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
      </svg>
      {label !== undefined && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "8px", color, fontFamily: "'DM Mono', monospace", fontWeight: "600",
        }}>{label}%</div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SPARKLINE
═══════════════════════════════════════════════════════════════ */
function Sparkline({ values, color, width = 80, height = 20 }) {
  if (!values || values.length < 2) return null;
  const max = Math.max(...values, 1);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - (v / max) * (height - 2) - 1;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <circle cx={pts.split(" ").pop().split(",")[0]} cy={pts.split(" ").pop().split(",")[1]}
        r="2.5" fill={color} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED ROADMAP TIMELINE
═══════════════════════════════════════════════════════════════ */
function RoadmapTimeline({ phases, activePhase, onPhase }) {
  return (
    <div style={{ position: "relative", padding: "8px 0 8px 16px" }}>
      {/* Vertical line */}
      <div style={{
        position: "absolute", left: "24px", top: 0, bottom: 0, width: "1px",
        background: "linear-gradient(180deg, #C8F542 0%, #42C8F5 25%, #F5A742 50%, #F542A7 75%, #F55442 100%)",
        opacity: 0.2,
      }} />
      {phases.map((p, i) => {
        const isActive = i === activePhase;
        const isPast = i < activePhase;
        return (
          <div key={p.id} onClick={() => onPhase(i)} style={{
            display: "flex", alignItems: "flex-start", gap: "16px",
            marginBottom: i < phases.length - 1 ? "20px" : 0,
            cursor: "pointer", opacity: isPast ? 0.5 : 1,
            transition: "opacity 0.2s",
          }}>
            <div style={{
              width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0,
              background: isActive ? p.color : (isPast ? p.color + "66" : "#111"),
              border: `2px solid ${isActive ? p.color : (isPast ? p.color + "44" : "#2a2a2a")}`,
              boxShadow: isActive ? `0 0 0 4px ${p.color}22, 0 0 12px ${p.color}44` : "none",
              transition: "all 0.3s ease", zIndex: 1,
              marginTop: "2px",
            }} />
            <div>
              <div style={{
                fontSize: "11px", color: isActive ? "#fff" : "#888",
                fontFamily: "'DM Mono', monospace",
                fontWeight: isActive ? "600" : "400",
              }}>
                P{p.id} <span style={{ color: isActive ? p.color : "#555" }}>{p.icon}</span> {p.shortTitle}
              </div>
              {isActive && (
                <div style={{ fontSize: "10px", color: "#888", marginTop: "2px", fontFamily: "'DM Mono', monospace" }}>{p.weeks}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NOISE + SCANLINE OVERLAYS
═══════════════════════════════════════════════════════════════ */
const Overlays = () => (
  <>
    {/* scanline removed */}
    <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 997, opacity: 0.025 }} xmlns="http://www.w3.org/2000/svg">
      <filter id="nx"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width="100%" height="100%" filter="url(#nx)" />
    </svg>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   SECTION LABEL
═══════════════════════════════════════════════════════════════ */
function SectionLabel({ children, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px", marginTop: "6px" }}>
      <div style={{ width: "3px", height: "14px", background: color, borderRadius: "1px", flexShrink: 0, boxShadow: `0 0 8px ${color}88` }} />
      <span style={{ fontSize: "11px", color, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: "700", fontFamily: "'DM Mono', monospace" }}>{children}</span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${color}30, transparent)` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC ITEM
═══════════════════════════════════════════════════════════════ */
function TopicItem({ text, color, delay = 0 }) {
  return (
    <div className="fade-up" style={{
      display: "flex", gap: "14px", alignItems: "flex-start",
      padding: "11px 0", borderBottom: "1px solid #0c0c0c",
      animationDelay: `${delay}ms`,
    }}>
      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: color, flexShrink: 0, marginTop: "10px", boxShadow: `0 0 6px ${color}` }} />
      <span style={{ fontSize: "15px", color: "#d4d4d4", lineHeight: "1.75", fontFamily: "'DM Serif Display', Georgia, serif" }}>{text}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHECK ITEM
═══════════════════════════════════════════════════════════════ */
function CheckItem({ text, checked, accent, darkColor, onToggle }) {
  const [justChecked, setJustChecked] = useState(false);
  const handleToggle = () => {
    if (!checked) { setJustChecked(true); setTimeout(() => setJustChecked(false), 450); }
    onToggle();
  };
  return (
    <div onClick={handleToggle} className="check-item" style={{
      display: "flex", gap: "14px", alignItems: "flex-start",
      padding: "13px 16px", marginBottom: "6px",
      background: checked ? darkColor : "#080808",
      border: `1px solid ${checked ? accent + "55" : "#141414"}`,
      borderRadius: "4px", cursor: "pointer",
      transition: "all 0.18s ease",
      transform: justChecked ? "scale(1.01)" : "scale(1)",
      boxShadow: justChecked ? `0 0 16px ${accent}33` : "none",
    }}>
      <div style={{
        width: "18px", height: "18px", flexShrink: 0, marginTop: "2px",
        border: `1.5px solid ${checked ? accent : "#2a2a2a"}`,
        background: checked ? accent : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "10px", color: "#000", fontWeight: "900",
        transition: "all 0.18s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
        boxShadow: checked ? `0 0 10px ${accent}66` : "none",
        animation: justChecked ? "celebratePop 0.45s cubic-bezier(0.36,0.07,0.19,0.97)" : "none",
      }}>
        {checked ? "✓" : ""}
      </div>
      <span style={{
        fontSize: "14px", color: checked ? "#555" : "#e0e0e0",
        textDecoration: checked ? "line-through" : "none",
        lineHeight: "1.7", fontFamily: "'DM Serif Display', Georgia, serif",
        transition: "color 0.2s",
      }}>{text}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RESOURCE CARD
═══════════════════════════════════════════════════════════════ */
function ResourceCard({ item, accent, delay = 0 }) {
  const tc = tagColors[item.tag] || "#666";
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer"
      className="resource-card fade-up"
      style={{
        display: "flex", flexDirection: "column", gap: "10px",
        padding: "15px 17px",
        background: item.stars === 5 ? "#0a0a0a" : "#070707",
        border: item.stars === 5 ? `1px solid ${accent}22` : "1px solid #181818",
        borderRadius: "4px",
        textDecoration: "none", position: "relative",
        animationDelay: `${delay}ms`,
        transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.border = `1px solid ${accent}66`;
        e.currentTarget.style.background = "#0f0f0f";
        e.currentTarget.style.boxShadow = `0 8px 28px ${accent}18`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = item.stars === 5 ? `1px solid ${accent}22` : "1px solid #181818";
        e.currentTarget.style.background = "#070707";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ position: "absolute", top: "-1px", right: "10px", display: "flex", gap: "4px" }}>
        {item.stars === 5 && (
          <div style={{ background: accent, color: "#000", fontSize: "7px", fontWeight: "900", letterSpacing: "0.15em", padding: "2px 7px", borderRadius: "0 0 3px 3px", fontFamily: "'DM Mono', monospace" }}>TOP</div>
        )}
        {item.free && (
          <div style={{ background: "#C8F542", color: "#000", fontSize: "7px", fontWeight: "900", letterSpacing: "0.18em", padding: "2px 7px", borderRadius: "0 0 3px 3px", fontFamily: "'DM Mono', monospace" }}>FREE</div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <span style={{ fontSize: "14px", color: "#e8e8e8", lineHeight: "1.55", flex: 1, fontFamily: "'DM Serif Display', Georgia, serif" }}>
          {item.name}
        </span>
        <span style={{
          fontSize: "9px", padding: "3px 8px", flexShrink: 0,
          background: tc + "15", color: tc, border: `1px solid ${tc}22`,
          whiteSpace: "nowrap", fontWeight: "600", letterSpacing: "0.12em",
          fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
        }}>{item.tag}</span>
      </div>
      {item.stars && (
        <span style={{ letterSpacing: "2px", fontSize: "11px" }}>
          {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: i <= item.stars ? accent : "#1e1e1e" }}>★</span>)}
        </span>
      )}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TICKER TAPE
═══════════════════════════════════════════════════════════════ */
function TickerTape() {
  const items = ["MIT OCW", "Harvard CS50x", "CMU 15-213", "Berkeley CS162", "Stanford CS144", "MIT 6.824", "Cornell CS6120", "Nand2Tetris", "100% FREE", "NO PAYWALLS", "8 PHASES", "BUILD EVERYTHING"];
  const text = items.join("  ·  ");
  return (
    <div style={{ overflow: "hidden", background: "#0a0a0a", borderBottom: "1px solid #111", height: "28px", display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", animation: "ticker 30s linear infinite", whiteSpace: "nowrap" }}>
        {[text, text].map((t, i) => (
          <span key={i} style={{ fontSize: "9px", color: "#555", letterSpacing: "0.2em", fontFamily: "'DM Mono', monospace", paddingRight: "80px" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const width = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1120;

  const [view, setView] = useState("landing"); // "landing" | "main" | "capstone"
  const [activePhase, setActivePhase] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [checkedItems, setCheckedItems] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resFilter, setResFilter] = useState("all");
  const [cmdOpen, setCmdOpen] = useState(false);
  const [hovPhase, setHovPhase] = useState(null);
  const [sidebarTab, setSidebarTab] = useState("nav"); // "nav" | "timeline"
  const contentRef = useRef(null);

  // Keyboard shortcuts
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdOpen(c => !c); }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const phase = phases[activePhase];
  const resources = resourcesByPhase[phase.id];

  const totalPossible = phases.reduce((a, p) =>
    a + p.checklist.theory.length + p.checklist.programming.length + p.checklist.engineering.length, 0);
  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const globalPct = Math.round((totalChecked / totalPossible) * 100);

  const phaseProgress = useCallback((idx) => {
    const p = phases[idx]; let n = 0;
    ["theory", "programming", "engineering"].forEach(s =>
      p.checklist[s].forEach(item => { if (checkedItems[`${p.id}-${s}-${item}`]) n++; }));
    return { done: n, total: p.checklist.theory.length + p.checklist.programming.length + p.checklist.engineering.length };
  }, [checkedItems]);

  const sparklineData = phases.map((_, i) => {
    const pp = phaseProgress(i);
    return pp.total > 0 ? Math.round((pp.done / pp.total) * 100) : 0;
  });

  const toggle = (key) => setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));

  const goPhase = (i) => {
    setActivePhase(i); setActiveTab("overview"); setResFilter("all");
    setSidebarOpen(false); setView("main");
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  const allRes = resources ? [
    ...resources.courses.map(r => ({ ...r, cat: "Courses" })),
    ...resources.books.map(r => ({ ...r, cat: "Books & Texts" })),
    ...resources.practice.map(r => ({ ...r, cat: "Practice" })),
    ...resources.videos.map(r => ({ ...r, cat: "Videos" })),
  ] : [];
  const filteredRes = resFilter === "all" ? allRes : allRes.filter(r => r.cat === resFilter);

  const tabs = [
    { id: "overview",   label: "Overview",   icon: "◉", group: "learn",   hint: "What you'll learn" },
    { id: "resources",  label: "Resources",  icon: "⬡", group: "learn",   hint: "Free courses & books" },
    { id: "math",       label: "Math",       icon: "∑", group: "learn",   hint: "Theory & hardware" },
    { id: "systems",    label: "Systems",    icon: "▣", group: "learn",   hint: "C programming" },
    { id: "projects",   label: "Build",      icon: "◈", group: "do",      hint: "Projects to build" },
    { id: "mastery",    label: "Mastery",    icon: "✓", group: "do",      hint: "Track your progress" },
    { id: "challenges", label: "Challenges", icon: "★", group: "do",      hint: "Graduate problems" },
  ];

  const dm = difficultyMeta[phase.difficulty] || difficultyMeta["Foundations"];
  const prog = phaseProgress(activePhase);
  const phasePct = prog.total > 0 ? Math.round((prog.done / prog.total) * 100) : 0;

  /* ─── LANDING ─── */
  const { displayed: headline, done: headlineDone } = useTypewriter("Build-Everything Computer Science Curriculum", 28, 400);

  if (view === "landing") {
    return (
      <div style={{ minHeight: "100vh", background: "#040404", fontFamily: "'DM Mono', 'Courier New', monospace", color: "#fff", position: "relative", overflow: "hidden" }}>
        <GlobalStyles />
        <Overlays />
        <CursorGlow />

        {/* Grid */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* Multi-orb bg */}
        {phases.map((p, i) => (
          <div key={p.id} style={{
            position: "fixed", borderRadius: "50%", pointerEvents: "none", zIndex: 0,
            width: 300 + i * 30, height: 300 + i * 30,
            left: `${10 + i * 11}%`, top: `${20 + (i % 3) * 25}%`,
            background: `radial-gradient(circle, ${p.color}08 0%, transparent 70%)`,
            animation: `float ${4 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }} />
        ))}

        {/* Nav */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: isMobile ? "14px 20px" : "16px 48px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: "1px solid #0f0f0f", background: "#04040499",
          backdropFilter: "blur(24px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "26px", height: "26px", background: "linear-gradient(135deg,#C8F542,#42C8F5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "900", color: "#000" }}>N</div>
            <span style={{ fontSize: "10px", color: "#888", letterSpacing: "0.22em" }}>NEXUSCODEX</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {!isMobile && ["MIT", "CMU", "Stanford", "Berkeley", "Harvard"].map(s => (
              <span key={s} style={{ fontSize: "9px", color: "#888", padding: "3px 9px", border: "1px solid #222", letterSpacing: "0.12em" }}>{s}</span>
            ))}
            <button onClick={() => setCmdOpen(true)} style={{
              background: "#0d0d0d", border: "1px solid #222", color: "#555",
              padding: "6px 12px", cursor: "pointer", fontSize: "9px",
              letterSpacing: "0.12em", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span>⌘K</span><span style={{ color: "#333" }}>SEARCH</span>
            </button>
          </div>
        </nav>

        {cmdOpen && <CommandPalette phases={phases} onPhase={goPhase} onClose={() => { setCmdOpen(false); if (view === "landing") setView("landing"); }} checkedItems={checkedItems} />}

        <TickerTape />

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? "110px 24px 80px" : "120px 48px 80px", textAlign: "center" }}>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "36px" }} className="fade-up">
            <div style={{ width: "28px", height: "1px", background: "#C8F542" }} />
            <span style={{ fontSize: "9px", color: "#C8F542", letterSpacing: "0.35em" }}>OPEN·SOURCE · CS · EDUCATION</span>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C8F542", animation: "pulse-ring 2s ease-out infinite" }} />
          </div>

          {/* Giant typewriter headline */}
          <div style={{ maxWidth: "960px", marginBottom: "32px" }} className="fade-up stagger-1">
            <h1 style={{
              fontFamily: "'DM Serif Display', Georgia, 'Times New Roman', serif",
              fontSize: isMobile ? "clamp(40px, 11vw, 64px)" : "clamp(60px, 6.5vw, 100px)",
              fontWeight: "400", lineHeight: "1.02", letterSpacing: "-0.025em", color: "#f0f0f0",
              textAlign: "center",
            }}>
              {headline.split("Computer Science").map((part, i) => i === 0 ? part : (
                <span key={i}>
                  <span style={{ background: "linear-gradient(135deg, #C8F542, #42C8F5 60%, #A742F5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>Computer Science</span>
                  {part}
                </span>
              ))}
              {!headlineDone && <span style={{ animation: "blink 1s step-end infinite", color: "#C8F542" }}>|</span>}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="fade-up stagger-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: isMobile ? "16px" : "19px", color: "#999", lineHeight: "1.7", maxWidth: "520px", marginBottom: "40px", textAlign: "center" }}>
            8 phases. 100% free. MIT · CMU · Stanford · Berkeley.
            No Coursera paywalls. Build real systems from nothing.
          </p>

          {/* Live progress sparkline */}
          {totalChecked > 0 && (
            <div className="fade-up stagger-2" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "28px" }}>
              <Sparkline values={sparklineData} color="#C8F542" width={120} height={24} />
              <span style={{ fontSize: "10px", color: "#888", letterSpacing: "0.1em" }}>{totalChecked} tasks completed · {globalPct}%</span>
            </div>
          )}

          {/* Phase matrix — fully centered */}
          <div className="fade-up stagger-3" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "40px", width: "100%" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(4,1fr)" : "repeat(8,1fr)",
              gap: "6px",
              width: isMobile ? "min(320px, 100%)" : "min(640px, 100%)",
              margin: "0 auto",
            }}>
              {phases.map((p, i) => {
                const pp = phaseProgress(i);
                const ppct = pp.total > 0 ? Math.round((pp.done / pp.total) * 100) : 0;
                return (
                  <button key={p.id} className="phase-btn"
                    onMouseEnter={() => setHovPhase(i)} onMouseLeave={() => setHovPhase(null)}
                    onClick={() => goPhase(i)}
                    style={{
                      aspectRatio: "1", background: hovPhase === i ? p.darkColor : "#080808",
                      border: `1px solid ${hovPhase === i ? p.color + "66" : "#181818"}`,
                      cursor: "pointer", display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", gap: "3px",
                      transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)", fontFamily: "inherit",
                      transform: hovPhase === i ? "scale(1.08)" : "scale(1)",
                      position: "relative", overflow: "hidden",
                    }}>
                    {ppct > 0 && (
                      <div style={{ position: "absolute", bottom: 0, left: 0, height: "2px", width: `${ppct}%`, background: p.color, transition: "width 0.4s" }} />
                    )}
                    <span style={{ fontSize: isMobile ? "15px" : "20px", color: hovPhase === i ? p.color : "#2a2a2a", transition: "color 0.2s", fontFamily: "'DM Serif Display', serif" }}>{p.icon}</span>
                    <span style={{ fontSize: "7px", color: hovPhase === i ? p.color : "#222", letterSpacing: "0.1em" }}>P{p.id}</span>
                  </button>
                );
              })}
            </div>

            {/* Hover label — stays centered under the grid */}
            <div style={{ height: "22px", marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {hovPhase !== null && (
                <div className="fade-up" style={{ fontSize: "12px", color: phases[hovPhase].color, letterSpacing: "0.05em", textAlign: "center" }}>
                  {phases[hovPhase].icon} Phase {phases[hovPhase].id} — {phases[hovPhase].title} · {phases[hovPhase].weeks}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="fade-up stagger-4" style={{ display: "flex", gap: isMobile ? "28px" : "52px", marginBottom: "48px", flexWrap: "wrap" }}>
            {[
              { n: "8", label: "Phases" },
              { n: totalPossible + "+", label: "Mastery Tasks" },
              { n: "100%", label: "Free Courses" },
              { n: "0", label: "Paywalls" },
            ].map(({ n, label }) => (
              <div key={label} style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "36px", color: "#d0d0d0", lineHeight: "1" }}>{n}</div>
                <div style={{ fontSize: "9px", color: "#333", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "4px" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="fade-up stagger-5" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => goPhase(0)} style={{
              padding: "16px 40px", background: "#C8F542", color: "#000",
              border: "2px solid #C8F542", cursor: "pointer", fontSize: "11px", fontWeight: "900",
              letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "inherit",
              transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", position: "relative", overflow: "hidden",
              boxShadow: "0 0 0 0 rgba(200,245,66,0)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#d4ff44"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(200,245,66,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#C8F542"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 0 0 rgba(200,245,66,0)"; }}
            >
              Begin Phase 01 →
            </button>
            <button onClick={() => setView("capstone")} style={{
              padding: "16px 28px", background: "transparent", color: "#666",
              border: "1px solid #2a2a2a", cursor: "pointer", fontSize: "10px",
              fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "inherit",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#bbb"; e.currentTarget.style.borderColor = "#555"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#666"; e.currentTarget.style.borderColor = "#2a2a2a"; }}
            >
              View Capstones
            </button>
            <button onClick={() => setCmdOpen(true)} style={{
              padding: "14px 18px", background: "transparent", color: "#2a2a2a",
              border: "1px solid #151515", cursor: "pointer", fontSize: "10px",
              fontFamily: "inherit", transition: "all 0.2s", letterSpacing: "0.1em",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#444"}
              onMouseLeave={e => e.currentTarget.style.color = "#2a2a2a"}
            >⌘K Search</button>
          </div>
        </div>

        {/* Bottom ticker */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10 }}>
          <TickerTape />
        </div>
      </div>
    );
  }

  /* ─── CAPSTONE ─── */
  if (view === "capstone") {
    return (
      <div style={{ minHeight: "100vh", background: "#040404", fontFamily: "'DM Mono', 'Courier New', monospace", color: "#fff" }}>
        <GlobalStyles />
        <Overlays />
        <CursorGlow />
        <TickerTape />
        <div style={{ padding: isMobile ? "20px" : "24px 60px", borderBottom: "1px solid #0e0e0e", display: "flex", alignItems: "center", gap: "20px", background: "#040404", position: "sticky", top: 0, zIndex: 10 }}>
          <button onClick={() => setView("landing")} style={{ background: "none", border: "1px solid #1a1a1a", color: "#444", padding: "7px 14px", cursor: "pointer", fontSize: "9px", letterSpacing: "0.15em" }}>← BACK</button>
          <span style={{ fontSize: "9px", color: "#666", letterSpacing: "0.3em" }}>CAPSTONE PROJECTS</span>
        </div>
        <div style={{ padding: isMobile ? "32px 24px 60px" : "56px 60px 80px" }}>
          <h2 className="fade-up" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: isMobile ? "36px" : "60px", fontWeight: "400", letterSpacing: "-0.02em", marginBottom: "8px" }}>Final Boss Projects</h2>
          <p className="fade-up stagger-1" style={{ color: "#888", fontSize: "16px", fontFamily: "'DM Serif Display', serif", marginBottom: "52px" }}>Choose one capstone to integrate everything from all 8 phases.</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "2px" }}>
            {capstoneProjects.map((p, i) => (
              <div key={i} className="fade-up" style={{ animationDelay: `${i * 60}ms`, padding: "28px 32px", background: "#070707", borderTop: `2px solid ${p.color}44`, transition: "all 0.2s", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#0c0c0c"; e.currentTarget.querySelector(".cpx-glow").style.opacity = "1"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#070707"; e.currentTarget.querySelector(".cpx-glow").style.opacity = "0"; }}
              >
                <div className="cpx-glow" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: p.color, opacity: 0, transition: "opacity 0.2s" }} />
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ fontSize: "22px", color: p.color, flexShrink: 0, fontFamily: "'DM Serif Display', serif", width: "32px" }}>{p.icon}</div>
                  <div>
                    <div style={{ fontSize: "15px", color: "#e0e0e0", fontWeight: "500", marginBottom: "7px", fontFamily: "'DM Serif Display', serif" }}>{p.name}</div>
                    <div style={{ fontSize: "13px", color: "#888", lineHeight: "1.65", fontFamily: "'DM Serif Display', serif" }}>{p.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "48px" }}>
            <button onClick={() => goPhase(0)} style={{ padding: "14px 32px", background: "#C8F542", color: "#000", border: "none", cursor: "pointer", fontSize: "10px", fontWeight: "800", letterSpacing: "0.18em", fontFamily: "inherit" }}>Begin Phase 01 →</button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── MAIN CURRICULUM ─── */
  return (
    <div style={{ display: "flex", height: "100vh", background: "#040404", fontFamily: "'DM Mono', 'Courier New', monospace", color: "#fff", overflow: "hidden" }}>
      <GlobalStyles />
      <Overlays />
      <CursorGlow />

      {cmdOpen && <CommandPalette phases={phases} onPhase={goPhase} onClose={() => setCmdOpen(false)} checkedItems={checkedItems} />}

      {/* SIDEBAR */}
      <aside style={{
        width: isMobile ? (sidebarOpen ? "100vw" : "0") : "240px",
        minWidth: isMobile ? (sidebarOpen ? "100vw" : "0") : "240px",
        height: "100vh", background: "#030303",
        borderRight: "1px solid #0e0e0e",
        overflow: "hidden", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        position: isMobile ? "fixed" : "relative", zIndex: isMobile ? 200 : 1,
        flexShrink: 0, display: "flex", flexDirection: "column",
      }}>
        {/* Sidebar header */}
        <div style={{ padding: "18px 18px 14px", borderBottom: "1px solid #0c0c0c", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "22px", height: "22px", background: "linear-gradient(135deg,#C8F542,#42C8F5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "900", color: "#000" }}>N</div>
            <span style={{ fontSize: "9px", color: "#888", letterSpacing: "0.22em" }}>NEXUSCODEX</span>
          </div>
          {isMobile && <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "18px" }}>×</button>}
        </div>

        {/* Sidebar sub-tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #0c0c0c", flexShrink: 0 }}>
          {["nav", "timeline"].map(t => (
            <button key={t} onClick={() => setSidebarTab(t)} style={{
              flex: 1, padding: "9px 0", background: "none", border: "none",
              borderBottom: `1px solid ${sidebarTab === t ? "#C8F54266" : "transparent"}`,
              color: sidebarTab === t ? "#C8F542" : "#666",
              cursor: "pointer", fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "inherit",
            }}>{t}</button>
          ))}
        </div>

        {/* Global progress bar */}
        <div style={{ padding: "12px 18px", borderBottom: "1px solid #0c0c0c", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "8px", color: "#555", letterSpacing: "0.18em" }}>
              {globalPct === 0 ? "BEGIN YOUR JOURNEY" : globalPct < 25 ? "JUST GETTING STARTED" : globalPct < 50 ? "BUILDING MOMENTUM" : globalPct < 75 ? "HALFWAY THERE" : globalPct < 100 ? "ALMOST ELITE" : "CURRICULUM COMPLETE"}
            </span>
            <span style={{ fontSize: "9px", color: "#C8F542", fontFamily: "'DM Mono', monospace", fontWeight: "600" }}>{globalPct}%</span>
          </div>
          <div style={{ height: "2px", background: "#111", position: "relative" }}>
            <div style={{ height: "100%", width: `${globalPct}%`, background: "linear-gradient(90deg,#C8F542,#42C8F5,#A742F5,#F55442)", transition: "width 0.6s", position: "relative" }}>
              {globalPct > 2 && <div style={{ position: "absolute", right: 0, top: "-2px", width: "6px", height: "6px", borderRadius: "50%", background: "#fff", boxShadow: "0 0 6px #fff" }} />}
            </div>
          </div>
          <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Sparkline values={sparklineData} color="#C8F54288" width={100} height={16} />
            <span style={{ fontSize: "9px", color: "#777", fontFamily: "'DM Mono', monospace" }}>{totalChecked}<span style={{color:"#333"}}>/{totalPossible}</span></span>
          </div>
        </div>

        {/* NAV or TIMELINE */}
        <div style={{ flex: 1, overflowY: "auto", padding: sidebarTab === "timeline" ? "16px 12px" : "6px 0" }}>
          {sidebarTab === "nav" ? phases.map((p, i) => {
            const pp = phaseProgress(i);
            const ppct = pp.total > 0 ? Math.round((pp.done / pp.total) * 100) : 0;
            const active = i === activePhase;
            return (
              <button key={p.id} onClick={() => goPhase(i)} style={{
                width: "100%", background: active ? p.darkColor : "transparent",
                border: "none", borderLeft: `2px solid ${active ? p.color : "transparent"}`,
                padding: "11px 16px 11px 14px", cursor: "pointer", textAlign: "left",
                fontFamily: "inherit", transition: "all 0.15s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "13px", color: active ? p.color : "#222", flexShrink: 0, fontFamily: "'DM Serif Display', serif" }}>{p.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "11px", color: active ? "#fff" : "#888", fontWeight: active ? "700" : "400", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      <span style={{ color: active ? p.color : "#555", marginRight: "4px" }}>P{String(p.id).padStart(2,"0")}</span>{p.shortTitle}
                    </div>
                    <div style={{ marginTop: "3px", height: "1px", background: "#111" }}>
                      <div style={{ height: "100%", width: `${ppct}%`, background: p.color, transition: "width 0.4s" }} />
                    </div>
                  </div>
                  <ProgressRing pct={ppct} size={22} stroke={2} color={p.color} />
                </div>
              </button>
            );
          }) : (
            <RoadmapTimeline phases={phases} activePhase={activePhase} onPhase={goPhase} />
          )}
        </div>

        {/* Sidebar footer */}
        <div style={{ padding: "12px 14px", borderTop: "1px solid #0c0c0c", flexShrink: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
          <button onClick={() => setCmdOpen(true)} style={{
            width: "100%", padding: "9px", background: "#0a0a0a", border: "1px solid #181818",
            color: "#333", cursor: "pointer", fontSize: "8px", letterSpacing: "0.18em",
            textTransform: "uppercase", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}>
            <span style={{ color: "#555" }}>⌘K</span> Command Palette
          </button>
          <button onClick={() => setView("capstone")} style={{ width: "100%", padding: "8px", background: "none", border: "1px solid #1e1e1e", color: "#555", cursor: "pointer", fontSize: "8px", letterSpacing: "0.15em", fontFamily: "inherit", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#444"; e.currentTarget.style.color = "#888"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.color = "#555"; }}
          >⬡ Capstone Projects</button>
          <button onClick={() => setView("landing")} style={{ width: "100%", padding: "7px", background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: "8px", letterSpacing: "0.15em", fontFamily: "inherit", transition: "color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#666"}
            onMouseLeave={e => e.currentTarget.style.color = "#333"}
          >← Back to Home</button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

        {/* Top bar */}
        <div style={{ padding: isMobile ? "12px 14px" : "14px 28px", borderBottom: "1px solid #0d0d0d", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#040404", flexShrink: 0, gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0 }}>
            {isMobile && <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "1px solid #1a1a1a", color: "#555", cursor: "pointer", padding: "5px 9px", fontSize: "12px" }}>☰</button>}

            {/* Phase dot */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: "34px", height: "34px", background: phase.darkColor, border: `1px solid ${phase.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", color: phase.color, fontFamily: "'DM Serif Display', serif" }}>{phase.icon}</div>
              <div style={{ position: "absolute", inset: "-4px", borderRadius: "50%", border: `1px solid ${phase.color}22`, animation: "pulse-ring 3s ease-out infinite", pointerEvents: "none" }} />
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: isMobile ? "12px" : "13px", fontWeight: "500", color: "#ddd", lineHeight: "1.2", fontFamily: "'DM Serif Display', serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {isMobile ? phase.shortTitle : phase.title}
              </div>
              <div style={{ fontSize: "9px", color: "#777", marginTop: "2px", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#555" }}>Phase {phase.id}/{phases.length}</span>
                <span style={{ color: "#333" }}>·</span>
                <span style={{ color: phase.color, opacity: 0.75 }}>{phase.difficulty}</span>
                <span style={{ color: "#333" }}>·</span>
                <span style={{ color: "#555" }}>{phase.weeks}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            {/* Prev/next arrows */}
            <button onClick={() => activePhase > 0 && goPhase(activePhase - 1)} disabled={activePhase === 0}
              style={{ background: "none", border: "1px solid #1e1e1e", color: activePhase === 0 ? "#2a2a2a" : "#777", padding: "6px 12px", cursor: activePhase === 0 ? "default" : "pointer", fontSize: "13px", fontFamily: "inherit", transition: "all 0.15s", borderRadius: "3px" }}
              onMouseEnter={e => { if (activePhase > 0) { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.borderColor = "#444"; }}}
              onMouseLeave={e => { e.currentTarget.style.color = activePhase === 0 ? "#2a2a2a" : "#777"; e.currentTarget.style.borderColor = "#1e1e1e"; }}
              title="Previous phase"
            >‹</button>
            <button onClick={() => activePhase < phases.length - 1 && goPhase(activePhase + 1)} disabled={activePhase === phases.length - 1}
              style={{ background: "none", border: "1px solid #1e1e1e", color: activePhase === phases.length - 1 ? "#2a2a2a" : "#777", padding: "6px 12px", cursor: activePhase === phases.length - 1 ? "default" : "pointer", fontSize: "13px", fontFamily: "inherit", transition: "all 0.15s", borderRadius: "3px" }}
              onMouseEnter={e => { if (activePhase < phases.length - 1) { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.borderColor = "#444"; }}}
              onMouseLeave={e => { e.currentTarget.style.color = activePhase === phases.length - 1 ? "#2a2a2a" : "#777"; e.currentTarget.style.borderColor = "#1e1e1e"; }}
              title="Next phase"
            >›</button>

            <span style={{ fontSize: "8px", padding: "3px 9px", background: dm.bg, color: dm.color, border: `1px solid ${dm.color}33`, letterSpacing: "0.12em", fontWeight: "600", textTransform: "uppercase" }}>{phase.difficulty}</span>
            <ProgressRing pct={phasePct} size={32} stroke={2} color={phase.color} label={phasePct} />
          </div>
        </div>

        {/* Tab bar — grouped for cognitive chunking (Miller's Law) */}
        <div style={{ display: "flex", padding: "0 14px", borderBottom: "1px solid #0d0d0d", background: "#030303", flexShrink: 0, overflowX: "auto", alignItems: "stretch" }}>
          {tabs.map((t, i) => {
            const isActive = activeTab === t.id;
            const prevGroup = i > 0 ? tabs[i-1].group : t.group;
            const showDivider = i > 0 && prevGroup !== t.group;
            return (
              <div key={t.id} style={{ display: "flex", alignItems: "stretch" }}>
                {showDivider && (
                  <div style={{ width: "1px", background: "#1a1a1a", margin: "8px 4px", flexShrink: 0 }} />
                )}
                <button
                  onClick={() => setActiveTab(t.id)}
                  title={t.hint}
                  style={{
                    padding: "11px 13px", background: "none", border: "none",
                    borderBottom: `2px solid ${isActive ? phase.color : "transparent"}`,
                    color: isActive ? phase.color : "#555",
                    cursor: "pointer", fontSize: "9px", fontFamily: "inherit",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    transition: "all 0.18s", whiteSpace: "nowrap",
                    fontWeight: isActive ? "700" : "400",
                    opacity: isActive ? 1 : 0.65,
                    position: "relative",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.opacity = "1"; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "#555"; e.currentTarget.style.opacity = "0.65"; }}}
                >
                  {t.icon} {t.label}
                  {t.id === "mastery" && prog.done > 0 && !isActive && (
                    <span style={{ position: "absolute", top: "7px", right: "4px", width: "5px", height: "5px", borderRadius: "50%", background: phase.color, boxShadow: `0 0 6px ${phase.color}` }} />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Tab Content */}
        <div ref={contentRef} key={`${activePhase}-${activeTab}`} style={{ flex: 1, overflowY: "auto", padding: isMobile ? "22px 16px" : "28px 36px" }}>

          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div>
              {/* Hero quote */}
              <div className="fade-up" style={{ padding: "22px 26px", marginBottom: "28px", background: phase.darkColor, borderLeft: `3px solid ${phase.color}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "50%", right: "20px", transform: "translateY(-50%)", fontSize: "80px", color: phase.color, opacity: 0.05, fontFamily: "'DM Serif Display', serif", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>{phase.icon}</div>
                <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: isMobile ? "20px" : "26px", color: phase.color, fontStyle: "italic", lineHeight: "1.4", letterSpacing: "-0.01em" }}>"{phase.tagline}"</div>
                <div style={{ marginTop: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", color: "#888", letterSpacing: "0.1em" }}>{phase.weeks}</span>
                  <span style={{ color: "#333" }}>·</span>
                  <span style={{ fontSize: "9px", color: dm.color, letterSpacing: "0.12em" }}>{phase.difficulty.toUpperCase()}</span>
                  <span style={{ color: "#1e1e1e" }}>·</span>
                  <span style={{ fontSize: "9px", color: "#333" }}>{prog.done}/{prog.total} COMPLETED</span>
                </div>
              </div>

              {/* All-phase mini progress bar strip */}
              <div className="fade-up stagger-1" style={{ display: "flex", gap: "4px", marginBottom: "28px" }}>
                {phases.map((p, i) => {
                  const pp = phaseProgress(i);
                  const ppct = pp.total > 0 ? Math.round((pp.done / pp.total) * 100) : 0;
                  return (
                    <button key={p.id} onClick={() => goPhase(i)} style={{
                      flex: 1, height: "5px", background: "#111", border: "none", cursor: "pointer",
                      position: "relative", padding: 0,
                    }}>
                      <div style={{ height: "100%", width: `${ppct}%`, background: p.color, transition: "width 0.5s" }} />
                      {i === activePhase && <div style={{ position: "absolute", inset: "-1px", border: `1px solid ${p.color}88` }} />}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: (isMobile || isTablet) ? "1fr" : "1fr 1fr", gap: "28px" }}>
                <div>
                  <SectionLabel color={phase.color}>Build Projects</SectionLabel>
                  {phase.projects.map((proj, i) => (
                    <div key={i} className="fade-up" style={{ animationDelay: `${i * 80}ms`, marginBottom: "14px", padding: "18px 20px", background: "#070707", border: `1px solid #141414`, borderRadius: "4px" }}>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
                        <div style={{ width: "26px", height: "26px", background: phase.darkColor, border: `1px solid ${phase.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: phase.color, fontWeight: "700", flexShrink: 0 }}>{proj.letter}</div>
                        <span style={{ fontSize: "13px", color: "#ddd", fontFamily: "'DM Serif Display', serif" }}>{proj.name}</span>
                      </div>
                      <div style={{ paddingLeft: "38px" }}>
                        {proj.items.map((item, j) => (
                          <div key={j} style={{ display: "flex", gap: "10px", padding: "5px 0", borderBottom: j < proj.items.length - 1 ? "1px solid #0c0c0c" : "none" }}>
                            <span style={{ color: phase.color + "77", flexShrink: 0, marginTop: "1px", fontSize: "10px" }}>→</span>
                            <span style={{ fontSize: "11px", color: "#555", lineHeight: "1.5", fontFamily: "'DM Serif Display', serif" }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <SectionLabel color={phase.color}>Teaching Method</SectionLabel>
                  <div style={{ marginBottom: "24px" }}>
                    {phase.pedagogy.map((item, i) => (
                      <div key={i} className="fade-up" style={{ animationDelay: `${i * 60}ms`, display: "flex", gap: "12px", alignItems: "flex-start", padding: "11px 0", borderBottom: "1px solid #0c0c0c" }}>
                        <span style={{ fontSize: "8px", color: phase.color, fontWeight: "700", flexShrink: 0, marginTop: "3px", background: phase.darkColor, border: `1px solid ${phase.color}33`, padding: "2px 6px" }}>{String(i + 1).padStart(2, "0")}</span>
                        <span style={{ fontSize: "12px", color: "#666", lineHeight: "1.65", fontFamily: "'DM Serif Display', serif" }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <SectionLabel color={phase.color}>Quick Navigate</SectionLabel>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                    {phases.map((p, i) => {
                      const pp = phaseProgress(i);
                      const ppct = pp.total > 0 ? Math.round((pp.done / pp.total) * 100) : 0;
                      return (
                        <button key={p.id} onClick={() => goPhase(i)} style={{
                          padding: "11px 12px", background: i === activePhase ? p.darkColor : "#070707",
                          border: `1px solid ${i === activePhase ? p.color + "44" : "#131313"}`,
                          cursor: "pointer", textAlign: "left", fontFamily: "inherit", transition: "all 0.15s",
                        }}>
                          <div style={{ fontSize: "9px", color: i === activePhase ? p.color : "#2a2a2a", fontWeight: "700", fontFamily: "'DM Serif Display', serif" }}>{p.icon} P{p.id}</div>
                          <div style={{ fontSize: "9px", color: i === activePhase ? "#555" : "#1e1e1e", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.shortTitle}</div>
                          {ppct > 0 && <div style={{ marginTop: "4px", height: "1px", width: `${ppct}%`, background: p.color + "88" }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── RESOURCES ── */}
          {activeTab === "resources" && (
            <div>
              <div className="fade-up" style={{ padding: "14px 18px", marginBottom: "22px", background: "#0a1400", border: "1px solid #C8F54230", display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "12px", color: "#C8F542", flexShrink: 0 }}>✓</span>
                <div>
                  <div style={{ fontSize: "9px", color: "#C8F542", fontWeight: "700", marginBottom: "3px", letterSpacing: "0.12em" }}>100% FREE — ALL PAYWALLS REMOVED</div>
                  <div style={{ fontSize: "11px", color: "#444", lineHeight: "1.5", fontFamily: "'DM Serif Display', serif" }}>Coursera paid auditing replaced with MIT OCW, YouTube lecture series, and open university courses. Every course marked FREE is genuinely free.</div>
                </div>
              </div>

              <div className="fade-up stagger-1" style={{ display: "flex", gap: "6px", marginBottom: "22px", flexWrap: "wrap" }}>
                {["all", "Courses", "Books & Texts", "Practice", "Videos"].map(f => (
                  <button key={f} onClick={() => setResFilter(f)} style={{
                    padding: "6px 13px", background: resFilter === f ? phase.darkColor : "#080808",
                    border: `1px solid ${resFilter === f ? phase.color + "66" : "#181818"}`,
                    color: resFilter === f ? phase.color : "#333",
                    cursor: "pointer", fontSize: "8px", letterSpacing: "0.15em",
                    textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.15s",
                  }}>{f === "all" ? "All" : f}</button>
                ))}
                <span style={{ marginLeft: "auto", fontSize: "9px", color: "#2a2a2a", alignSelf: "center" }}>{filteredRes.length} resources</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "7px" }}>
                {filteredRes.map((item, i) => <ResourceCard key={i} item={item} accent={phase.color} delay={i * 35} />)}
              </div>
            </div>
          )}

          {/* ── MATH ── */}
          {activeTab === "math" && (
            <div>
              <SectionLabel color={phase.color}>Mathematical Foundations</SectionLabel>
              {phase.math.map((item, i) => <TopicItem key={i} text={item} color={phase.color} delay={i * 50} />)}
            </div>
          )}

          {/* ── SYSTEMS ── */}
          {activeTab === "systems" && (
            <div>
              <SectionLabel color={phase.color}>Hardware Architecture</SectionLabel>
              {phase.hardware.map((item, i) => <TopicItem key={i} text={item} color={phase.color} delay={i * 50} />)}
              <div style={{ margin: "24px 0" }} />
              <SectionLabel color={phase.color}>C Programming</SectionLabel>
              {phase.cpp.map((item, i) => <TopicItem key={i} text={item} color={phase.color} delay={i * 50} />)}
            </div>
          )}

          {/* ── PROJECTS ── */}
          {activeTab === "projects" && (
            <div>
              <SectionLabel color={phase.color}>Build Projects</SectionLabel>
              {phase.projects.map((proj, i) => (
                <div key={i} className="fade-up" style={{ animationDelay: `${i * 100}ms`, marginBottom: "20px", padding: "26px 28px", background: "#070707", borderTop: `2px solid ${phase.color}55`, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "50%", right: "16px", transform: "translateY(-50%)", fontSize: "64px", color: phase.color, opacity: 0.04, fontWeight: "900", pointerEvents: "none" }}>{proj.letter}</div>
                  <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "18px" }}>
                    <div style={{ width: "34px", height: "34px", background: phase.darkColor, border: `1px solid ${phase.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", color: phase.color, fontWeight: "800", flexShrink: 0 }}>{proj.letter}</div>
                    <div>
                      <div style={{ fontSize: "15px", color: "#ddd", fontFamily: "'DM Serif Display', serif" }}>{proj.name}</div>
                      <div style={{ fontSize: "9px", color: "#555", marginTop: "2px", letterSpacing: "0.15em" }}>PROJECT {String(i + 1).padStart(2, "0")}</div>
                    </div>
                  </div>
                  <div style={{ paddingLeft: "48px" }}>
                    {proj.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "8px 0", borderBottom: j < proj.items.length - 1 ? "1px solid #0c0c0c" : "none" }}>
                        <span style={{ fontSize: "9px", color: phase.color, flexShrink: 0, marginTop: "3px" }}>→</span>
                        <span style={{ fontSize: "14px", color: "#bbb", lineHeight: "1.6", fontFamily: "'DM Serif Display', serif" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── MASTERY ── */}
          {activeTab === "mastery" && (
            <div>
              {/* Mastery score card */}
              <div className="fade-up" style={{ display: "flex", gap: "20px", alignItems: "center", padding: "22px 26px", background: phase.darkColor, border: `1px solid ${phase.color}33`, marginBottom: "28px", flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "50%", right: "20px", transform: "translateY(-50%)", fontSize: "72px", color: phase.color, opacity: 0.04, fontFamily: "'DM Serif Display', serif", pointerEvents: "none", userSelect: "none" }}>
                  {phasePct === 100 ? "✓" : phasePct > 50 ? "◑" : "○"}
                </div>
                <ProgressRing pct={phasePct} size={60} stroke={3} color={phase.color} label={phasePct} />
                <div>
                  <div style={{ fontSize: "20px", color: "#f0f0f0", fontFamily: "'DM Serif Display', serif", marginBottom: "5px" }}>
                    {phasePct === 0 ? "Ready to begin?" : phasePct < 30 ? "You've started — don't stop." : phasePct < 60 ? "You're in the zone." : phasePct < 100 ? "Almost there — finish strong." : "Phase complete. 🎯"}
                  </div>
                  <div style={{ fontSize: "11px", color: "#888", display: "flex", gap: "12px", alignItems: "center" }}>
                    <span>{prog.done} of {prog.total} tasks</span>
                    <span style={{ color: "#333" }}>·</span>
                    <span style={{ color: phase.color }}>{prog.total - prog.done > 0 ? `${prog.total - prog.done} remaining` : "All done"}</span>
                  </div>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                  <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.12em", marginBottom: "5px" }}>GLOBAL MASTERY</div>
                  <div style={{ fontSize: "26px", color: "#C8F542", fontFamily: "'DM Serif Display', serif", lineHeight: 1 }}>{globalPct}%</div>
                  <div style={{ fontSize: "9px", color: "#444", marginTop: "3px" }}>{totalChecked}/{totalPossible} tasks</div>
                </div>
              </div>

              {[
                { key: "theory", label: "Theory & Proof", icon: "∑" },
                { key: "programming", label: "Programming", icon: "⌨" },
                { key: "engineering", label: "Engineering", icon: "⚙" },
              ].map(({ key, label, icon }, si) => (
                <div key={key} className="fade-up" style={{ animationDelay: `${si * 80}ms`, marginBottom: "32px" }}>
                  <SectionLabel color={phase.color}>{icon} {label}</SectionLabel>
                  {phase.checklist[key].map((item, i) => {
                    const k = `${phase.id}-${key}-${item}`;
                    return <CheckItem key={i} text={item} checked={!!checkedItems[k]} accent={phase.color} darkColor={phase.darkColor} onToggle={() => toggle(k)} />;
                  })}
                </div>
              ))}
            </div>
          )}

          {/* ── CHALLENGES ── */}
          {activeTab === "challenges" && (
            <div>
              <SectionLabel color={phase.color}>Graduate-Level Challenges</SectionLabel>
              {phase.challenges.map((c, i) => (
                <div key={i} className="fade-up" style={{ animationDelay: `${i * 70}ms`, padding: "18px 22px", marginBottom: "8px", background: "#070707", borderLeft: `3px solid ${phase.color}55` }}>
                  <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{ fontSize: "8px", color: phase.color, background: phase.darkColor, border: `1px solid ${phase.color}33`, padding: "3px 8px", flexShrink: 0, marginTop: "3px", fontWeight: "900" }}>#{String(i + 1).padStart(2, "0")}</div>
                    <span style={{ fontSize: "15px", color: "#e0e0e0", lineHeight: "1.75", fontFamily: "'DM Serif Display', serif" }}>{c}</span>
                  </div>
                </div>
              ))}

              <div style={{ margin: "32px 0 20px" }} />
              <SectionLabel color={phase.color}>Mini Exam Format</SectionLabel>
              <div style={{ background: "#070707", border: "1px solid #121212" }}>
                {[
                  ["Written", "Mathematical proofs and derivations — closed notes", "45 min"],
                  ["Implement", "Write a complete working C program from scratch", "90 min"],
                  ["Debug", "Find and fix 5 planted bugs in provided source code", "45 min"],
                  ["Optimize", "Improve a provided solution by ≥2× measured speedup", "60 min"],
                  ["Design", "Architect a system that satisfies given constraints", "30 min"],
                ].map(([type, desc, time], i, arr) => (
                  <div key={type} style={{ display: "flex", alignItems: "center", padding: "13px 18px", gap: "14px", borderBottom: i < arr.length - 1 ? "1px solid #0c0c0c" : "none" }}>
                    <div style={{ fontSize: "8px", color: "#000", background: phase.color, padding: "3px 9px", flexShrink: 0, fontWeight: "900", letterSpacing: "0.1em" }}>{type.toUpperCase()}</div>
                    <div style={{ flex: 1, fontSize: "13px", color: "#aaa", fontFamily: "'DM Serif Display', serif" }}>{desc}</div>
                    <div style={{ fontSize: "10px", color: "#666", flexShrink: 0 }}>{time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom status bar */}
        <div style={{ padding: "8px 20px", borderTop: "1px solid #0a0a0a", background: "#030303", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <span style={{ fontSize: "9px", color: "#555", letterSpacing: "0.15em" }}>P{phase.id}/{phases.length}</span>
            <span style={{ fontSize: "9px", color: "#555" }}>·</span>
            <span style={{ fontSize: "9px", color: "#666", letterSpacing: "0.1em" }}>{phase.shortTitle.toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <span style={{ fontSize: "9px", color: "#555", letterSpacing: "0.12em" }}>⌘K SEARCH</span>
            <span style={{ fontSize: "9px", color: "#555" }}>MIT · CMU · STANFORD · BERKELEY</span>
          </div>
        </div>
      </main>
    </div>
  );
}