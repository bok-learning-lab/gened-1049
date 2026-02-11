---
sidebar_position: 1
nav_title: "Core Argument"
---

# The Core Argument for Vibes-First Coding

## The Central Claim

**The ability to work effectively with powerful, partially opaque systems you can steer through language is now a core literacy — and this literacy is best learned by doing, not by traditional building-blocks-first instruction.**

## 1. The World Has Changed

Before late 2022, creating working code required understanding code. After late 2022, you can describe what you want in natural language and receive working code in return. This is not a minor improvement in developer tooling. It is a fundamental shift in the interface to computation.

The bottleneck has moved. It used to be: *Can you write syntactically correct code?* Now it is: *Can you specify intent, verify correctness, and iterate?* As OpenAI's GPT-4 technical report makes plain, large language models predict the text that should come next — they don't "understand" in the human sense but generate plausible continuations.[1] Trust, therefore, must come from external verification, not from the fluency of the output. If trust comes from verification rather than from understanding every line, then verification becomes the core skill. This is a different literacy than writing code from scratch.

## 2. This Literacy Already Exists

We already work this way in other domains, and we don't consider it fraudulent.

Most drivers can't explain fuel injection, transmission algorithms, or anti-lock braking systems, but they have operational competence: they interpret dashboard signals, notice strange sounds, adapt to conditions, and know when to take the car to a mechanic. No one considers this "fake driving." Editors don't read every word of every page before publication; they sample, triangulate, check key claims, and verify consistency. This isn't laziness — it's strategic verification. Social scientists run regression analyses without implementing optimization algorithms; they understand assumptions, interpret outputs, and detect nonsense. This isn't ignorance — it's appropriate abstraction. Many musicians learn by ear before learning theory; playing first builds intuition, and theory makes it legible and extensible. This isn't cheating — it's a valid learning path, know-how before know-that.

In every case, the pattern is the same: literacy means competence under partial understanding — knowing what matters, knowing what to check, and knowing when to go deeper.

## 3. Humanities Scholars Already Think This Way

Humanities scholars, in particular, have exactly the right training for this kind of work. Consider how you work with texts: you don't read every word of every source. You sample strategically. You test claims against evidence. You triangulate multiple sources. You know how to spot red flags — weak citations, logical gaps, suspicious claims. You build arguments on foundations you can defend.

Vibe coding is applying scholarly verification practices to AI-generated code. Close reading key passages becomes reading critical code sections. Verifying citations becomes testing edge cases. Assessing argument validity becomes verifying logic. Detecting weak evidence becomes catching bugs. The methods transfer; only the artifact changes.

## The Meta-Skill

The real skill being taught here isn't Python syntax or JavaScript frameworks. The real skill is: *How do I work effectively with powerful systems I don't fully understand but can steer through language?*

This meta-skill applies to AI coding assistants today, to data analysis tools today, and to future AI systems we can't yet imagine.

Bruno Latour's concept of "black boxing" illuminates why.[2] As Latour observed, "When a machine runs efficiently, when a matter of fact is settled, one need focus only on its inputs and outputs and not on its internal complexity. Thus, paradoxically, the more science and technology succeed, the more opaque and obscure they become." As systems become reliable, attention shifts to what goes in (specification), what comes out (verification), and what the system enables (capabilities). You open the box when needed — when it breaks, when you need to modify it, when stakes are high. This is how we already work with compilers, databases, frameworks, and operating systems. Most programmers don't understand compiler implementation; most developers don't understand B-tree algorithms; most web developers don't understand React's reconciliation algorithm. Appropriate abstraction is not ignorance. It's engineering.

## Why This Is Responsible, Not Reckless

The immediate objection is obvious: "You're teaching people to use code they don't understand. That's dangerous."

The response is that we're teaching verification practices that make partial understanding responsible. Responsible vibe coding involves four interlocking literacies. *Specification literacy* means stating what should happen, including constraints on what it must not do, with success criteria and a minimum viable scope. *Verification literacy* means running it, instrumenting it with logging, probing edge cases, writing micro-tests, and cross-checking against known answers. *Selective reading* means reading the entry point, identifying data flow, spotting danger zones like file deletion or network calls, and understanding the key logic relevant to your domain. *Incremental trust* means recognizing that confidence grows with successful checks — that "does it work?" is different from "do I trust it for production?" and that higher stakes demand more verification.

This is how scholars already work. When you encounter a new historical document, you don't understand every word immediately. You don't need to in order to get value. You verify key claims, check against other sources, build trust incrementally, and know when you need expertise. Same process, different artifact.

## The Karpathy Definition

Andrej Karpathy — former OpenAI researcher, former Tesla AI director — coined "vibe coding" with this description: "There's a new kind of coding I call 'vibe coding,' where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works."[3][4]

The key phrases are revealing: "forget that the code even exists" (focus on intent and outcomes, not syntax), "I just see stuff, say stuff, run stuff" (natural language interface), and "it mostly works" (good enough for many contexts). Crucially, Karpathy is an extremely skilled programmer. He doesn't need AI help. He uses it because it's faster, because it removes drudgery, and because it's good enough for prototypes and experiments. When an expert *chooses* vibe coding, it's not because they can't "really code" — it's because the task doesn't require that level of engagement.

Simon Willison, creator of Datasette and Django core developer, offers a useful distinction: "If an LLM wrote every line of your code, but you've reviewed, tested, and understood it all, that's not vibe coding in my book — that's using an LLM as a typing assistant."[5] Vibe coding, in other words, means accepting AI-generated code without full understanding.[6] This is appropriate when stakes are low, outcomes are verifiable, time matters, and you'd otherwise skip the work entirely. It is not appropriate when lives depend on it, money is at stake, security matters, or others need to maintain the code.

The responsible position: vibe coding is a tool, not a religion. Use it when appropriate. Go deeper when necessary. Be honest about what you understand.

## The Extended Mind

Andy Clark and David Chalmers argue that humans have always been "natural-born cyborgs" — we extend cognition through tools.[7][8] Writing is external memory. Maps are spatial reasoning. Calculators are numerical computation. Search engines are information retrieval. AI code generation is the latest in a long line of cognitive extensions.

The historical parallel is instructive. When writing was invented, people feared it would destroy human memory, make minds lazy, create superficial knowledge, and devalue deep understanding.[9] These fears seem laughable now, but we haven't rid ourselves of their root cause: a mistaken cognitive self-image. We think of ourselves as "just brains," but we've always been brain-plus-tools. LLMs are tools — powerful, imperfect, rapidly improving tools. Learning to work with them is not outsourcing thinking. It's extending thinking.

Edwin Hutchins, the cognitive anthropologist, takes this further: cognition is often distributed across people and artifacts.[10] The cognitive unit isn't one person's brain — it's you (intent, judgment, domain knowledge) plus the LLM (code generation, pattern matching) plus the runtime (execution, error messages) plus documentation (reference, examples) plus tests (verification, confidence). This system solves problems that no individual component could solve alone. Learning to orchestrate this system is the literacy.

## Tacit Knowledge and Know-How

Michael Polanyi observed that "we can know more than we can tell."[11] You can recognize faces without explaining the algorithm. You can ride a bike without articulating the physics. You speak grammatically without knowing the rules. This is knowing-how as distinct from knowing-that, and as Gilbert Ryle argued, knowing-how is logically prior in many skilled activities.[12]

Students who work vibes-first will develop what we might call "code taste" before they can explain it — a sense that "this feels wrong," "this looks risky," or "this should work." This isn't a failure of the method; it's a stage of expertise. Traditional pedagogy says theory leads to practice. Vibes-first says practice leads to intuition leads to theory. Both paths arrive at understanding. The route differs.

## The Shifted Question

The old question was: *Can you write this code from scratch?*

The new question is: *Can you specify what you want, verify what you got, and iterate until it works?*

Both are valid. But in 2025 and beyond, the second skill is increasingly valuable across more contexts — especially for those who need computational tools but don't aspire to be software engineers.

## Why Now?

Three things converged around 2023. LLMs got good enough: natural language to working code became reliable — not perfect, but useful, and improving fast. Interfaces improved: ChatGPT made it conversational, Cursor and Copilot integrated it into IDEs, Claude Code brought it to the command line. And the educational need intensified: computational literacy is increasingly necessary, traditional CS education can't scale to meet demand, and the barriers have been unnecessarily high.

For the first time, we can teach computational literacy without teaching syntax first.

## The Pedagogical Claim

The traditional approach asks students to learn syntax (weeks), then data structures (weeks), then algorithms (weeks), then finally build something useful (months later). Most people give up before they build anything. The vibes-first approach inverts this: build something useful (minutes), verify it works (minutes), understand what matters (on demand), go deeper if needed (motivated by real use). The advantage is immediate value, intrinsic motivation, and a lower barrier to entry. The academic grounding for this claim is developed in [Learning Theory Foundations](02-learning-theory.md).

We can think of understanding in three levels. *Operational* understanding means you can use it effectively, verify it works, and detect when it fails. *Conceptual* understanding means you grasp key abstractions, can modify and extend the code, explain it to others, and debug non-obvious failures. *Implementation* understanding means you know the low-level details, can implement from scratch, and can optimize performance. Traditional teaching goes from implementation to conceptual to operational (3 → 2 → 1). Vibes-first goes from operational to conceptual to implementation if needed (1 → 2 → 3). Most people need Level 1. Some need Level 2. Few need Level 3. Vibes-first gets everyone to operational understanding quickly, then supports progression as motivation and necessity warrant.

## Summary

The argument has eight parts, and they reinforce each other. Natural language to code works now, and verification is the bottleneck (technological reality). We already work this way in other domains (conceptual precedent). Humanities scholars already have verification practices (cultural fit). Learning to work with AI systems is the real literacy (meta-skill). A verification framework makes partial understanding accountable (responsible practice). We've always been tool users, and this is the latest extension (extended mind). Immediate value drives motivation, which drives deeper learning (pedagogical advantage). And the tools are ready, the interfaces are ready, the need is urgent (timing).

This is not coding made easy. It is a different literacy for a different era.

---

## Sources

[1] OpenAI — GPT-4 Technical Report. https://openai.com/research/gpt-4

[2] Latour, Bruno — *Science in Action: How to Follow Scientists and Engineers through Society* (1987). Blackboxing concept: https://en.wikipedia.org/wiki/Blackboxing

[3] Karpathy, Andrej (@karpathy) — Original "vibe coding" tweet (February 2, 2025). https://x.com/karpathy

[4] "Will the future of software development run on vibes?" — Ars Technica. https://web.archive.org/web/20250306124303/https://arstechnica.com/ai/2025/03/is-vibe-coding-with-ai-gnarly-or-reckless-maybe-some-of-both/

[5] Willison, Simon — "Not all AI-assisted programming is vibe coding (but vibe coding rocks)." https://simonwillison.net/2025/Mar/19/vibe-coding/

[6] "Vibe coding" — Wikipedia. https://en.wikipedia.org/wiki/Vibe_coding

[7] Clark, Andy — "Extending Minds with Generative AI" — Nature Communications. https://www.nature.com/articles/s41467-025-59906-9

[8] Clark, Andy — *Natural-Born Cyborgs: Minds, Technologies, and the Future of Human Intelligence* (2003).

[9] Plato — *Phaedrus* (Socrates' critique of writing). Analysis in Nature article: https://www.nature.com/articles/s41467-025-59906-9

[10] Hutchins, Edwin — *Cognition in the Wild* (1995). MIT Press. https://mitpress.mit.edu/9780262581462/cognition-in-the-wild/

[11] Polanyi, Michael — *The Tacit Dimension* (1966). University of Chicago Press.

[12] Ryle, Gilbert — *The Concept of Mind* (1949). Discussion of know-how vs know-that.

---

**Next:** [Learning Theory Foundations →](02-learning-theory.md)

**Back to:** [Index](00-index.md)
