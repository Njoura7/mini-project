# Formal Verification meets AI — Using Lean as a Practical Bridge

**Presenter:** Abdulaziz Najjar
**Course:** Formal Semantics — Eötvös Loránd University
**Duration:** 15–20 minutes (includes 3 Lean 4 code walkthroughs)
**Date:** Spring 2026

---

## Overview

| #   | Section                                       | Time    | Key Reference                            |
| --- | --------------------------------------------- | ------- | ---------------------------------------- |
| 1   | Hook — When AI Gets It Wrong                  | 2 min   | AlphaProof (DeepMind, 2024)              |
| 2   | The Gap: Testing vs. Proving                  | 3 min   | Course lectures 3 & 4 (Horpácsi)         |
| 3   | Enter Lean — A Language That Checks Your Math | 2 min   | LeanDojo (Yang et al., NeurIPS 2023)     |
| 4   | Code Walkthroughs — Three Proofs for AI       | 5–7 min | Inspired by TorchLean (arXiv 2602.22631) |
| 5   | The Big Picture — AI That Proves              | 3 min   | DeepSeek-Prover-V2 (2025)                |
| 6   | Closing — The Next Decade's Question          | 1–2 min | —                                        |

---

## Slide 1 — Title Slide

**Title:** Formal Verification meets AI — Using Lean as a Practical Bridge

**Subtitle:** When mathematical proof meets machine learning

**Visual:** Split image — one side: a neural network diagram, other side: a formal proof tree (similar to the derivation trees from Lecture 3)

> **Speaker Note:**
> "Good morning/afternoon everyone. Today I want to talk about something that sits at the intersection of what we've been learning in this course — formal semantics, inference rules, proofs — and something you've all been hearing about constantly: AI. The question I want to pose is simple: _can we actually prove that AI systems are correct?_ And if so, how?"

---

## Slide 2 — The Hook: AI Fails Silently

**Title:** When AI Gets It Wrong — And Nobody Notices

**Bullets:**

- 2024: A major self-driving system misclassified a stopped fire truck as "sky" — at highway speed
- Medical AI systems have produced confident but wrong diagnoses
- ChatGPT-style models hallucinate mathematical proofs that _look_ correct but aren't

**Key quote (on slide):**

> "Testing shows the presence of bugs, never their absence." — Edsger Dijkstra

> **Speaker Note:**
> "We trust AI with critical decisions — driving, medical imaging, financial trading. But here's the problem: these systems can fail in ways we don't anticipate. A self-driving car doesn't fail like a traditional program with a crash — it fails _silently_, with a confident wrong answer. This is exactly the kind of problem that testing alone cannot solve. Dijkstra said it decades ago, and it's more relevant now than ever."

---

## Slide 3 — Testing vs. Proving: The Core Distinction

**Title:** Testing vs. Proving — What This Course Prepared You For

**Bullets:**

- **Testing:** Run finitely many inputs, check outputs → "it worked on _these_ cases"
- **Proving:** Establish a property holds for _all_ inputs → "it works _always_"
- This course gives us the language for the second approach

**Visual:** Two-column comparison table

| Testing             | Formal Proof                     |
| ------------------- | -------------------------------- |
| Finite samples      | Universal statement              |
| Can miss edge cases | Covers all cases by construction |
| `assert f(3) == 9`  | `∀ x, f(x) = x²`                 |

> **Speaker Note:**
> "In this course, we've seen exactly this distinction play out. Remember from Lecture 3 — when we defined the denotational semantics of expressions, we wrote something like A⟦a₁ + a₂⟧s = A⟦a₁⟧s + A⟦a₂⟧s. That's not a test case — that's a _definition_ that covers every possible expression of that form, in every possible state. That's the power of formal methods: universality. The question is — can we bring this same power to AI systems?"

---

## Slide 4 — Recall: How We Define Meaning Formally

**Title:** From This Course — Formal Semantics in Two Flavours

**Bullets:**

- **Operational semantics:** ⟨S, s⟩ ⇒ ⟨S', s'⟩ — "how the machine steps through execution"
- **Denotational semantics:** ⟦S⟧s = s' — "what mathematical object does the program denote"
- Both aim at the same thing: _rigorous, unambiguous, mathematically precise meaning_

**Visual:** Show the inference rule format from Lecture 4:

```
    Premises       Conditions
   ─────────────────────────
        Conclusion
```

> **Speaker Note:**
> "Let me connect this talk directly to what we've been studying. In Lecture 4, we saw structural operational semantics — small-step rules that tell us exactly how a While-program moves from one configuration to the next. The key insight was: inference rules give us a _proof system_. If I can derive ⟨S, s⟩ ⇒* s', I haven't just run the program — I've *proved\* what it does. This is the exact same machinery that a proof assistant like Lean uses. The transition from what you know to what I'm about to show you is surprisingly short."

---

## Slide 5 — Enter Lean 4

**Title:** Lean 4 — A Language Where Every Statement Must Be Proved

**Bullets:**

- Lean 4: both a programming language _and_ an interactive proof assistant
- Based on dependent type theory (a very expressive type system)
- The compiler doesn't just check syntax — it checks _logical correctness_
- Think of it as: the compiler is your teaching assistant who never gets tired

**Analogy on slide:**

> In the course: we write inference rules on paper and check derivations by hand.
> In Lean: the computer checks every derivation step for us — _mechanized proof_.

> **Speaker Note:**
> "So what is Lean? Lean 4 is a programming language developed by Leonardo de Moura at Microsoft Research. But it's not just a language for writing programs — it's a language for writing _proofs_. Remember how in Lecture 3 we carefully constructed derivation sequences by hand, step by step, checking each inference rule? Lean automates that checking. You write the proof, and Lean either accepts it — meaning every step is logically valid — or it rejects it, telling you exactly where your reasoning broke down. It's like having a TA who is infinitely patient and never makes mistakes."

---

## Slide 6 — Why Lean Matters for AI (The Bridge)

**Title:** The Bridge — Why Connect Lean to AI?

**Bullets:**

- AI models are increasingly used in critical systems — but their properties are _unproven_
- **LeanDojo** (Yang et al., NeurIPS 2023): built an open-source toolkit that lets AI models interact with Lean to find proofs
  - Extracted 98,734 theorems and proofs from Lean's math library (Mathlib)
  - Trained a model (ReProver) that can suggest proof steps
- **AlphaProof** (DeepMind, 2024): used a Lean-based system to solve International Mathematical Olympiad problems — scored at silver-medal level
- The trend: _AI is learning to prove, and Lean is the arena_

> **Speaker Note:**
> "This is where it gets exciting. In 2023, a team from Caltech and MIT published LeanDojo at NeurIPS — one of the top AI conferences. They showed that you can extract the entire proof environment from Lean's math library, train a neural network on it, and have the AI _suggest_ proof steps. The AI doesn't just guess — it interacts with Lean's type checker to verify each step. Then in 2024, DeepMind's AlphaProof took this further: it solved IMO-level math problems using Lean as its verification backbone, scoring silver-medal level. The formal verification system we study in this course is becoming the language that AI uses to reason."

---

## Slide 7 — Code Walkthrough Overview

**Title:** Three Small Proofs — Lean Meets AI Concepts

**Bullets:**

- **Example 1:** ReLU is non-negative — a property every neural network assumes but rarely proves
- **Example 2:** Vector dimension agreement — matrix shapes must match, or everything breaks
- **Example 3:** MSE is non-negative — the most basic property of the most common loss function

**Note on slide:** _Inspired by the TorchLean project (arXiv 2602.22631), which aims to create formally verified tensor operations for deep learning_

> **Speaker Note:**
> "Now let's get concrete. I'll walk you through three small proofs written in Lean 4. Each one captures a property that every machine learning engineer _assumes_ is true — but in current deep learning frameworks, none of these are actually checked at the type level. These examples are inspired by the TorchLean project, which is an ongoing effort to build formally verified tensor operations. Don't worry about understanding every Lean syntax detail — focus on the _idea_: we state a property about an AI component, and the proof assistant verifies it."

---

## Slide 8 — Example 1: ReLU is Non-Negative

**Title:** Example 1 — Proving ReLU(x) ≥ 0

**Code on slide:**

```lean
-- ReLU(x) = max(0, x)  — the most common activation in neural networks
noncomputable def relu (x : ℝ) : ℝ := max 0 x

-- For ALL real x, relu(x) ≥ 0
theorem relu_nonneg (x : ℝ) : relu x ≥ 0 := by
  unfold relu              -- expand definition → goal: max 0 x ≥ 0
  exact le_max_left 0 x    -- lemma: 0 ≤ max(0, x)  ✓
```

**Connection to course (on slide):**

> Compare: just as we proved A⟦a⟧s is well-defined for all expressions a and states s (Lecture 3), here we prove ReLU(x) ≥ 0 for all real x.

> **Speaker Note:**
> "ReLU — Rectified Linear Unit — is the activation function used in almost every modern neural network. Its definition is dead simple: return the max of zero and x. Every ML engineer knows the output is non-negative, but _knowing_ and _proving_ are different things. Let me walk you through this code. First, we define `relu` — just `max 0 x`. Then we state a theorem: for all real x, `relu x ≥ 0`. The keyword `by` enters tactic mode — think of it as starting a derivation. `unfold relu` expands the definition so Lean sees `max 0 x`. Then `le_max_left` is a library lemma saying the left argument of `max` is always ≤ the result. Lean checks it, the proof is complete — not for one input, not for a test suite, but for every real number."

---

## Slide 9 — Example 2: Vector Dimension Match

**Title:** Example 2 — Shapes Must Agree (or It Won't Compile)

**Code on slide:**

```lean
-- Dimension n is part of the TYPE — checked at compile time
def vecAdd (a b : Fin n → ℝ) : Fin n → ℝ :=
  fun i => a i + b i

def v3 : Fin 3 → ℝ := ![1.0, 2.0, 3.0]
def v2 : Fin 2 → ℝ := ![10.0, 20.0]

#check vecAdd v3 v3   -- ✓ compiles (both Fin 3)
#check vecAdd v3 v2   -- ✗ TYPE ERROR: expected Fin 3, got Fin 2
```

**Connection to course (on slide):**

> This is analogous to static semantics (Lecture 1, slide 20): "syntactic constraints that cannot be described by context-free grammars" — here enforced by the type system.

> **Speaker Note:**
> "This one is my favourite because it shows the _preventive_ power of formal verification. In PyTorch, if you try to add two tensors of different shapes, you get a runtime error — maybe it crashes your training run 6 hours in at 3 AM. In Lean, the dimension is part of the _type_. `Fin n → ℝ` means a vector of exactly n real numbers. Look at the last line: trying to add a 3D and a 2D vector is not a runtime error — it's a _type error_. The code refuses to compile. Remember from the Introduction lecture when we discussed static semantics — constraints beyond what context-free grammars can capture? This is exactly that idea, but turbocharged with dependent types."

---

## Slide 10 — Example 3: MSE is Non-Negative

**Title:** Example 3 — Mean Squared Error ≥ 0

**Code on slide:**

```lean
-- MSE = Σ (yᵢ - ŷᵢ)²  — the standard regression loss
theorem mse_nonneg (ys ŷs : Fin n → ℝ) :
    0 ≤ ∑ i : Fin n, (ys i - ŷs i) ^ 2 := by
  apply Finset.sum_nonneg   -- a sum of non-negatives ≥ 0
  intro i _                  -- pick any index i
  exact sq_nonneg _          -- a square is always ≥ 0  ✓
```

**Connection to course (on slide):**

> Compositional reasoning: the proof of the sum's non-negativity is built from the proof of each term's non-negativity — just like denotational semantics is defined compositionally (Lecture 3).

> **Speaker Note:**
> "Our final example: Mean Squared Error. Every time you train a regression model, you minimize MSE. Its non-negativity is obvious — you're summing squares. But look at the proof structure. `Finset.sum_nonneg` says 'a sum of non-negative terms is non-negative' — that reduces the goal to proving each _term_ is non-negative. Then `sq_nonneg` finishes it: a square is always ≥ 0. We compose small facts into a bigger result. This is _exactly_ the compositionality principle from the denotational semantics lecture — the meaning of the whole is determined by the meanings of its parts."

---

## Slide 11 — The Big Picture: AI Systems That Prove

**Title:** The Emerging Ecosystem — AI × Formal Verification

**Bullets (timeline-style):**

- **2023 — LeanDojo** (Yang et al., NeurIPS): Open toolkit for LLM-based proof search in Lean
  - Key idea: treat Lean as an _environment_ the AI interacts with (like a game)
- **2024 — AlphaProof** (DeepMind): Solved 4 of 6 IMO 2024 problems using Lean
  - Combined reinforcement learning with formal verification
- **2025 — DeepSeek-Prover-V2** (DeepSeek AI): Open-source model that proves Lean theorems
  - Uses chain-of-thought reasoning to decompose proofs into subgoals
  - Achieves state-of-the-art on formal math benchmarks

**Visual:** A simple timeline graphic with the three milestones

> **Speaker Note:**
> "Let me zoom out and show you the trajectory. In 2023, LeanDojo demonstrated that you can build an open-source pipeline where an AI model proposes proof tactics and Lean verifies them — closing the loop between generation and verification. In 2024, AlphaProof from DeepMind showed this approach can crack competition-level mathematics — real IMO problems, verified in Lean. And just recently, DeepSeek-Prover-V2 pushed the frontier further with an open-source model that decomposes hard theorems into subgoals using chain-of-thought reasoning, then solves them in Lean. The pattern is clear: the best AI reasoning systems in the world are converging on formal proof assistants as their verification substrate."

---

## Slide 12 — Why This Matters (The Argument)

**Title:** From Course Theory to Real Impact

**Bullets:**

- What we learn in this course — inference rules, states, derivations — is the _foundation_
- Lean mechanizes exactly these ideas: propositions are types, proofs are programs
- The Curry-Howard correspondence: the bridge between logic and computation
- Formal verification is no longer just academic — it's becoming _industrial practice_

**On slide (two-column echo from Lecture 4):**

| Formal Semantics Course          | Lean + AI                              |
| -------------------------------- | -------------------------------------- |
| ⟨S, s⟩ ⇒ s' (SOS rule)           | `theorem ... := by ...` (Lean proof)   |
| Derivation sequence              | Tactic proof script                    |
| State: Var → ℤ                   | Context: variable assignments in scope |
| "Prove determinism by induction" | `induction` tactic in Lean             |

> **Speaker Note:**
> "I want to make this connection as explicit as possible. When we write an SOS rule with premises and a conclusion, we're writing an inference rule. When Lean checks a tactic proof, it's doing essentially the same thing — applying inference rules, checking premises, building a derivation. The states we model as Var → ℤ in this course? In Lean, that's the local context of variables in scope. The induction proofs we do on derivation sequence length? In Lean, you literally type `induction` and the system generates the subgoals. The gap between what's on the blackboard in this course and what's in a Lean proof file is remarkably small."

---

## Slide 13 — The Next Decade's Question

**Title:** The Next 10 Years Will Ask: Is Your AI Correct?

**Bullets:**

- Governments are already regulating AI (EU AI Act, 2024)
- "High-risk" AI systems will need to demonstrate _provable guarantees_
- The question shifts from "does it work on my test set?" to "can you _prove_ it's safe?"
- People who understand both AI and formal methods will be exceptionally valuable

**Closing quote on slide:**

> "In the future, deploying an unverified AI system in a critical application will be seen the way we now see deploying untested code in production — reckless."

> **Speaker Note:**
> "I'll leave you with this thought. The EU AI Act, passed in 2024, already classifies AI systems by risk level. High-risk systems — medical devices, autonomous vehicles, critical infrastructure — will face increasing pressure to provide formal guarantees. Not just test results. Not just benchmarks. _Proofs._ The formal methods tradition we're studying in this course is about to become one of the most practically relevant fields in computer science. The tools are here — Lean, Coq, Isabelle. The AI integration is happening — LeanDojo, AlphaProof, DeepSeek-Prover. The people who can bridge these worlds — formal semantics and machine learning — will shape how trustworthy AI gets built."

---

## Slide 14 — Summary

**Title:** Summary

**Bullets:**

- Formal verification gives _proofs_, not just tests — universal guarantees
- Lean 4 mechanizes the inference rule systems we study in this course
- AI is learning to _generate_ formal proofs (LeanDojo, AlphaProof, DeepSeek-Prover-V2)
- Three examples showed: ReLU ≥ 0, shape safety, MSE ≥ 0 — small but real
- The bridge between formal semantics and AI is Lean — and it's being built right now

> **Speaker Note:**
> "To summarize: formal verification is the natural next step beyond testing. Lean gives us a practical tool to mechanize the proof systems we study. AI is increasingly learning to use these tools. And the three examples we walked through — simple as they are — represent a genuine frontier: formally verified machine learning. Thank you. I'm happy to take questions."

---

## Slide 15 — References

**Title:** References

**Academic papers:**

1. Silver, D. et al. "AlphaProof: AI achieves silver-medal standard solving competition mathematics." DeepMind, 2024.
2. Yang, K. et al. "LeanDojo: Theorem Proving with Retrieval-Augmented Language Models." _NeurIPS_, 2023.
3. Wang, H. et al. "TorchLean: Formally Verified Tensor Operations." _arXiv:2602.22631_, 2026.
4. Ren, Z. et al. "DeepSeek-Prover-V2: Advancing Formal Mathematical Reasoning via Reinforcement Learning." _arXiv_, 2025.

**Course materials:** 5. Horpácsi, D. "Formal Semantics — Introduction." ELTE, Lecture 1. 6. Horpácsi, D. "Formal Semantics of Simple Expressions." ELTE, Lecture 3. 7. Horpácsi, D. "Structural Operational Semantics." ELTE, Lecture 4.

**Background:** 8. Nielson, H.R. & Nielson, F. _Semantics with Applications: A Formal Introduction._ Wiley, 1992.

---

## Appendix A — Paper–Slide Mapping

| Slide                    | Paper / Source               | How It's Used                               |
| ------------------------ | ---------------------------- | ------------------------------------------- |
| 2 (Hook)                 | AlphaProof (DeepMind, 2024)  | Motivation: AI solving IMO via formal proof |
| 3–4 (Testing vs Proving) | Lectures 1, 3, 4 (Horpácsi)  | Bridge from course content to verification  |
| 5–6 (Lean + AI)          | LeanDojo (NeurIPS 2023)      | Core "Lean as AI arena" narrative           |
| 7–10 (Code Walkthroughs) | TorchLean (arXiv 2602.22631) | Inspiration for AI-relevant Lean proofs     |
| 11 (Big Picture)         | DeepSeek-Prover-V2 (2025)    | Future direction of AI-powered proving      |

## Appendix B — Code Walkthrough Strategy

**Discussion order and timing:**

| Example           | Est. Time | Key talking point                                        |
| ----------------- | --------- | -------------------------------------------------------- |
| 1 — ReLU ≥ 0      | 1.5 min   | "Two tactics, universal proof — contrast with testing"   |
| 2 — Vector shapes | 2 min     | "Type error at compile time — show the error message"    |
| 3 — MSE ≥ 0       | 2 min     | "Compositional structure mirrors denotational semantics" |

**Tips for presenting code on slides:**

- Keep font size large — the audience reads the code, you explain it
- Highlight the key lines verbally (definition, theorem statement, each tactic)
- Use an arrow or pointer on the slide to guide the audience's eye line by line

## Appendix C — Connections to Course Material (Quick Reference)

These one-liners can be dropped naturally during the talk:

| Course Concept                         | Where to Reference | Bridge to Lean/AI                                |
| -------------------------------------- | ------------------ | ------------------------------------------------ |
| Inference rules (Lec 3, 4)             | Slides 4, 12       | "Lean tactics = applying inference rules"        |
| Compositionality (Lec 3)               | Slide 10           | "MSE proof composes like denotational semantics" |
| Static semantics (Lec 1)               | Slide 9            | "Dependent types = stronger static semantics"    |
| States: Var → ℤ (Lec 3, 4)             | Slide 12           | "Lean's local context ≈ our state function"      |
| Derivation sequences (Lec 4)           | Slide 12           | "A Lean proof script _is_ a derivation sequence" |
| Determinism proof by induction (Lec 4) | Slide 12           | "The `induction` tactic in Lean"                 |
| Testing vs formal proof (Lec 1)        | Slide 3            | "Dijkstra's quote — the whole motivation"        |

---

# Appendix D — Complete Lean 4 Code (Reference)

Below are the three complete Lean 4 source files behind the slide examples.
The slides show trimmed versions; these are the full files with detailed comments.
Kept here for the presenter's own reference and deeper study.

> **Pre-requisite:** A working Lean 4 + Mathlib project.
> Run `lake new demos math` then add Mathlib as a dependency in `lakefile.lean`.
> All three files go inside the project's source folder.

---

## Demo 1 — ReLU is Non-Negative

**File:** `Demos/Demo1_ReLU.lean`

**What we prove:** For every real number $x$, $\text{ReLU}(x) = \max(0, x) \geq 0$.

**Why it matters for AI:** ReLU is the default activation function in neural networks.
Every gradient computation assumes its output is non-negative — but no mainstream
ML framework actually _proves_ this at the type level.

**Course connection:** Just as we proved properties hold for _all_ expressions and
_all_ states in the denotational semantics (Lecture 3), here we prove a property
for _all_ real numbers.

```lean
/-
  Demo 1 — ReLU is Non-Negative
  ==============================
  We define ReLU and prove its output is always ≥ 0.
-/

-- Step 0: Imports
-- We only need basic Mathlib real-number facts.
import Mathlib.Analysis.SpecialFunctions.Pow.Real

-- Step 1: Define ReLU as a plain function on real numbers.
-- This mirrors the standard definition: ReLU(x) = max(0, x).
noncomputable def relu (x : ℝ) : ℝ := max 0 x

-- Step 2: State the theorem.
-- "For all x : ℝ, relu(x) ≥ 0"
-- In Lean, ≥ is notation for the ≤ relation flipped.
theorem relu_nonneg (x : ℝ) : relu x ≥ 0 := by
  -- Unfold the definition so the goal becomes: max 0 x ≥ 0
  unfold relu
  -- `le_max_left` says: for any a b, a ≤ max a b
  -- so 0 ≤ max 0 x, which is exactly our goal.
  exact le_max_left 0 x

-- Step 3 (bonus): Quick sanity check — evaluate on a concrete number.
-- This is the "test" version. The theorem above is the "proof" version.
#eval (max 0 (-3.5) : Float)   -- prints 0.0  ✓
#eval (max 0  (7.0) : Float)   -- prints 7.0  ✓
```

**Line-by-line discussion guide:**

| Line                    | Code                         | What to explain                                                                          |
| ----------------------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| Definition              | `noncomputable def relu ...` | "We define ReLU — just max of 0 and x. Standard definition."                             |
| Theorem header          | `theorem relu_nonneg ...`    | "We _claim_ this is always ≥ 0. The `: relu x ≥ 0` part is the property."                |
| `by`                    |                              | "Enters tactic mode — like starting a formal derivation."                                |
| `unfold relu`           |                              | "Expands the definition so Lean sees `max 0 x`."                                         |
| `exact le_max_left 0 x` |                              | "Cites the library lemma: 0 ≤ max(0, x). Proof done."                                    |
| `#eval` lines           |                              | "These are _tests_ on specific values. The theorem above is the _proof_ for all values." |

---

## Demo 2 — Vector Dimension Safety

**File:** `Demos/Demo2_VecShape.lean`

**What we prove:** Nothing — the safety is enforced _by the type system itself_.
We show that adding vectors of mismatched dimensions is a _compile-time_ error.

**Why it matters for AI:** Shape mismatch is the #1 runtime error in deep learning.
PyTorch throws `RuntimeError: shape mismatch` — often hours into a training run.
With dependent types, this class of bugs is eliminated entirely.

**Course connection:** This is the Lean equivalent of _static semantics_ (Lecture 1,
slide 20): "constraints that cannot be described by context-free grammars."
Dependent types go beyond what even traditional type systems can check.

```lean
/-
  Demo 2 — Vector Dimension Safety
  =================================
  We define type-safe vector addition and show that
  mismatched dimensions cause a COMPILE error, not a runtime crash.
-/

-- Step 0: Minimal imports — no Mathlib needed for this one.
import Mathlib.Data.Real.Basic

-- Step 1: Define a "vector" as a function from Fin n to ℝ.
-- Fin n = {0, 1, ..., n-1}, so (Fin n → ℝ) is a vector of exactly n reals.
-- The dimension n lives in the TYPE — it is checked at compile time.

-- Step 2: Define element-wise addition of two vectors.
-- Both vectors must have the SAME dimension n.
-- This is guaranteed by the type signature — not by a runtime check.
def vecAdd (a b : Fin n → ℝ) : Fin n → ℝ :=
  fun i => a i + b i

-- Step 3: Let's make some concrete vectors.
-- A 3-dimensional vector:
def v3 : Fin 3 → ℝ := ![1.0, 2.0, 3.0]

-- Another 3-dimensional vector:
def w3 : Fin 3 → ℝ := ![4.0, 5.0, 6.0]

-- A 2-dimensional vector:
def v2 : Fin 2 → ℝ := ![10.0, 20.0]

-- Step 4: This works — same dimension (3).
#check vecAdd v3 w3    -- ✓  Type: Fin 3 → ℝ

-- Step 5: THIS FAILS — dimension mismatch (3 vs 2).
-- Uncomment the line below to see the compile error:
-- #check vecAdd v3 v2    -- ✗  Type error!
-- Error: "type mismatch ... Fin 2 → ℝ ... expected Fin 3 → ℝ"

-- Step 6: Bonus — prove a property about vecAdd.
-- Element-wise addition is commutative.
theorem vecAdd_comm (a b : Fin n → ℝ) :
    vecAdd a b = vecAdd b a := by
  -- Two functions are equal if they agree on every input.
  funext i
  -- Now the goal is: a i + b i = b i + a i
  -- This is just commutativity of addition on ℝ.
  ring
```

**Line-by-line discussion guide:**

| Line                         | Code | What to explain                                                                                |
| ---------------------------- | ---- | ---------------------------------------------------------------------------------------------- |
| `def vecAdd ...`             |      | "Both inputs must be `Fin n → ℝ` with the _same_ n. The type enforces this."                   |
| `def v3`, `def w3`, `def v2` |      | "Two 3D vectors and one 2D vector — concrete examples."                                        |
| `#check vecAdd v3 w3`        |      | "Both are Fin 3 → ℝ — compiles fine."                                                          |
| `#check vecAdd v3 v2`        |      | "Fin 3 vs Fin 2 — type error. In PyTorch this would crash at runtime. Here it never compiles." |
| `theorem vecAdd_comm ...`    |      | "Bonus: we even prove commutativity — `funext` + `ring`."                                      |

---

## Demo 3 — MSE Loss is Non-Negative

**File:** `Demos/Demo3_MSE.lean`

**What we prove:** For any two vectors of predictions and targets,
$\text{MSE} = \sum_i (y_i - \hat{y}_i)^2 \geq 0$.

**Why it matters for AI:** MSE (Mean Squared Error) is the most common loss
function in regression. Its non-negativity is assumed everywhere — in convergence
proofs, in gradient descent analysis, in early stopping logic. But it is never
formally checked inside frameworks like PyTorch or TensorFlow.

**Course connection:** The proof is _compositional_ — exactly like denotational
semantics (Lecture 3). The meaning of the sum is built from the meaning of
each term: each $(y_i - \hat{y}_i)^2 \geq 0$, therefore their sum $\geq 0$.

```lean
/-
  Demo 3 — MSE Loss is Non-Negative
  ===================================
  We prove that the sum of squared differences is always ≥ 0.
  This is the core mathematical property behind MSE.
-/

-- Step 0: Imports
-- We need Finset.sum and basic real-number lemmas.
import Mathlib.Algebra.BigOperators.Group.Finset
import Mathlib.Algebra.Order.Ring.Lemmas

open Finset

-- Step 1: State the property.
-- For any two vectors (represented as Fin n → ℝ), the sum of
-- squared differences is non-negative.
theorem mse_nonneg (ys ŷs : Fin n → ℝ) :
    0 ≤ ∑ i : Fin n, (ys i - ŷs i) ^ 2 := by
  -- Strategy: a sum of non-negative terms is non-negative.
  -- This is Finset.sum_nonneg.
  apply Finset.sum_nonneg
  -- Now we must show: for each i, (ys i - ŷs i) ^ 2 ≥ 0
  intro i _
  -- A square of a real number is always non-negative.
  -- This is the lemma `sq_nonneg`.
  exact sq_nonneg (ys i - ŷs i)

-- Step 2: Let's also prove the building block separately,
-- so the audience sees the compositional structure.
-- "Each squared error is non-negative."
theorem single_sq_nonneg (a b : ℝ) : 0 ≤ (a - b) ^ 2 :=
  sq_nonneg (a - b)

-- Step 3: And re-prove the sum version using the single version,
-- to make compositionality explicit.
theorem mse_nonneg' (ys ŷs : Fin n → ℝ) :
    0 ≤ ∑ i : Fin n, (ys i - ŷs i) ^ 2 := by
  apply Finset.sum_nonneg
  intro i _
  exact single_sq_nonneg (ys i) (ŷs i)  -- reuse our lemma!
```

**Line-by-line discussion guide:**

| Line                      | Code                     | What to explain                                                                |
| ------------------------- | ------------------------ | ------------------------------------------------------------------------------ |
| Theorem header            | `theorem mse_nonneg ...` | "For _any_ two vectors of _any_ length, sum of squared differences ≥ 0."       |
| `apply Finset.sum_nonneg` |                          | "A sum of non-negatives is non-negative. Goal changes: prove each _term_ ≥ 0." |
| `intro i _`               |                          | "Pick an arbitrary index i."                                                   |
| `exact sq_nonneg ...`     |                          | "A square is non-negative. Done."                                              |
| `single_sq_nonneg`        |                          | "Same fact proved as a standalone lemma."                                      |
| `mse_nonneg'` using it    |                          | "We rebuild the proof _by citing our own lemma_ — compositionality in action." |

---

## Presentation Day Checklist

```
[ ] Slides exported to PDF and tested on the projector
[ ] Code snippets on slides are readable at projection size
[ ] You can explain each line of each code example without notes
[ ] You know the course-connection line for each example (see Appendix C)
[ ] Optional: have VS Code with the .lean files open as backup if someone asks to see it run
```
