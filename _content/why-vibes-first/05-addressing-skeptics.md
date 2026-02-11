---
sidebar_position: 5
nav_title: "Addressing Skeptics"
---

# Addressing Skeptics

## Overview

The vibes-first approach generates legitimate concerns. This document takes them seriously — acknowledging what's right in each objection before explaining where the objection breaks down.

## "This Is Just Cheating"

The force of this objection depends entirely on what the learning goal is. If the goal is "Can you write Python syntax from memory?" then yes, using AI circumvents that goal — just as using a calculator circumvents mental arithmetic. But if the goal is "Can you use computational tools to analyze texts?" then AI-assisted coding is a legitimate method, just as calculators are legitimate in a physics class where the goal is understanding physics, not doing arithmetic.

"Cheating" implies avoiding the learning that matters and getting credit without developing the skill. But vibes-first students *are* learning: how to specify computational problems, how to verify solutions, how to debug and iterate, how to work with AI systems, and how to apply computation to their domain. These are real skills — just different from traditional CS skills.

The historical parallel is exact. When pocket calculators arrived, educators worried: "Students won't learn arithmetic! This is cheating!" The resolution was contextual: some settings ban calculators (when learning arithmetic), most expect them (when doing math and science). The same applies to AI coding. CS degree programs may reasonably require writing from scratch (learning implementation). Applied computational work may reasonably expect AI assistance (doing useful work). Neither approach is "cheating" — they serve different goals.

## "They Won't Really Learn"

This objection requires defining "really learn." If it means "can implement from scratch," then no, vibes-first students won't reach that (at least not immediately). If it means "can specify, verify, and iterate," then yes, they will. Both definitions are valid. The question is: learn what, for what purpose?

Vibes-first students learn to translate domain problems into computational specifications (which is often harder than writing the code), to evaluate correctness without implementation knowledge (a skill that transfers across domains), to debug by forming and testing hypotheses (scientific thinking applied to code), to work with uncertainty and partial understanding (arguably the actual 21st-century skill), and to understand computational affordances (what's possible and worth trying).

The research evidence supports this. Kapur's productive failure research shows that struggling with complex problems before receiving instruction leads to deeper learning. Vibes-first creates this productive struggle: complex artifact, initial failure, motivated learning. Lave and Wenger's situated learning shows that legitimate peripheral participation is a valid path to expertise: authentic tasks, legitimate contribution even without full mastery, a path to full participation over time.

The deeper problem with this objection is that it presents a false dichotomy — traditional CS (real learning) versus vibes-first (fake learning). The reality is that traditional CS develops implementation understanding, vibes-first develops specification and verification understanding, and a hybrid approach develops both. Different paths lead to different outcomes. The question is which outcomes matter for which students.

## "What About Maintenance?"

This is a legitimate concern. AI-generated code combined with no understanding produces brittle systems. But vibes-first includes maintenance practices: documentation, testing, selective reading of critical sections, and incremental understanding as you modify code over time.

For many use cases, this is sufficient. When code breaks, you re-prompt the AI with the error message and verify the fix. When you need a small change, you specify the change and verify the result. When you need a major change, you may need to understand more deeply. When you face a performance issue, you may need expert help.

The honest answer is that some situations require deeper understanding — mission-critical systems, team maintenance, performance tuning, security concerns. In those cases, learn traditionally, hire an expert, use tested libraries, or get code review. Vibes-first is not appropriate for every context, and good vibes-first practice includes knowing your limits, documenting limitations, testing appropriately for the stakes, and knowing when to get help.

It's worth noting that traditional CS education doesn't guarantee maintainability either. Students write spaghetti code, without documentation, without tests, without understanding good practices. The skill isn't "write from scratch." The skill is "make it maintainable." Vibes-first can teach that — if we emphasize documentation, testing, and clarity.

## "LLMs Make Mistakes"

This is true, and it's why verification is central to vibes-first rather than incidental. LLMs are very good at generating plausible code and often correct for common patterns, but they're not perfect, they're confident even when wrong, and they can generate subtle bugs.

The response is not to avoid AI-generated code but to teach verification as a first-class skill. Every student learns: run it, inspect it, test it against known cases, probe edge cases, cross-check against manual calculation. This framework catches most AI errors.

There's even a pedagogical advantage to the fact that AI code contains bugs. In traditional CS education, students write code with bugs and must learn to debug — but testing is a separate skill, often neglected. In vibes-first coding, students encounter AI-generated bugs from day one, so verification becomes habit rather than afterthought. Skepticism is built in: "Does this actually work?" is the default question, not an advanced concern.

Bender et al. ("On the Dangers of Stochastic Parrots") remind us that LLMs are probability distributions over token sequences, not systems that "understand" in any human sense — prone to inscrutability, bias, and overconfidence. This is exactly why external verification is essential. The vibes-first response is: "We *know* the LLM doesn't understand. That's why we verify." This is more honest than treating LLM output as magical.

## "This Creates Technical Debt"

AI-generated code can be non-idiomatic, inefficient, or overly complex. Whether this matters depends on context.

In high-stakes contexts — production systems, team projects, performance-critical applications, long-term maintenance — code quality matters enormously. Don't use pure vibes-first for these. Bring in experts, do code review, refactor.

In low-stakes contexts — one-off analysis, personal projects, prototypes, learning exercises — getting it working matters more than getting it perfect. Vibes-first is appropriate. Document limitations. Don't pretend it's production-grade.

The comparison to Jupyter notebooks is apt. Notebooks are notorious for non-reproducible execution order, hidden state, lack of testing, and difficult version control. Yet they're incredibly valuable for exploratory data analysis, teaching, sharing results, and prototyping. We don't ban notebooks — we teach appropriate use. Same with vibes-first coding.

The progression matters too. Week 1: vibe-coded prototype that works but is messy. Week 2: add tests and documentation. Week 3: refactor for clarity with AI help. Week 4: code review and expert feedback. By week 4, you have maintainable code, and you learned iteratively. The alternative — spending four weeks learning from scratch before building anything useful — has its own costs: most students never reach the "build something useful" phase.

## "Real Programmers Don't Work This Way"

Many do. Simon Willison, a Django core developer, distinguishes between vibe coding (accepting code without full understanding) and using an LLM as a typing assistant (reviewing, testing, and understanding everything). Professional use of AI includes generating boilerplate, exploring APIs, prototyping quickly — followed by review, testing, and understanding before shipping. This is exactly the vibes-first sequence: specify, generate, verify, understand as needed.

Professional developers don't understand every line of every library they use — that would be impossible in codebases of millions of lines. They understand the parts that matter. They trust through testing. They abstract appropriately — and senior developers abstract *more*, not less. Vibes-first teaches professional-level abstraction from the start.

It's also worth noting that professional developers spend 70-80% of their time reading existing code, not writing new code. Traditional CS education inverts this ratio (90% writing from scratch). Vibes-first, with its emphasis on reading AI-generated code, verification, and specification, may actually be closer to professional practice than traditional education.

Millions of professional developers now use GitHub Copilot, Cursor, Claude Code, and ChatGPT for coding. Are they all "not real programmers"? Or are they using appropriate tools for their work?

## "This Isn't Computer Science"

Correct. And that's the point. Computer science — algorithms, data structures, complexity theory — is for CS majors and future software engineers. Computational literacy — specification, verification, iteration, understanding what computation can do — is for everyone who needs computational tools, which increasingly means everyone.

We don't teach every student to be a physicist. We teach some students physics (for future physicists), some students applied physics (for engineers), and some students physics concepts (for general literacy). The same logic applies to computation. Vibes-first teaches literacy, not science. For most audiences, that's appropriate.

## "You're Training Them to Be Dependent on AI"

This is a legitimate concern about any tool dependency, and it deserves an honest answer.

Are people who use calculators "dependent" on calculators? In a sense, yes — they can't do complex arithmetic mentally. But they can do *more math* than before. They haven't lost a skill they had; they've gained capabilities. Are people who use GPS "dependent" on GPS? They may navigate less by landmarks, but they can reach more places. The pattern with AI coding is the same: students may not memorize syntax, but they can build more tools than before, and most never had traditional CS training to lose.

The Socratic objection to writing is again instructive. Writing didn't destroy memory; it changed what we remember and enabled capabilities that purely oral cultures couldn't achieve. AI coding changes what we know (architecture rather than syntax) and enables capabilities beyond individual human speed. "Dependency" on tools is the human condition — and has been since the invention of writing.

The resilience question — what happens when AI fails or isn't available? — has a practical answer. Vibes-first students learn problem decomposition, verification thinking, debugging processes, and when to ask for help. These meta-skills transfer even without AI. Students can ask human experts, search documentation, test solutions, and iterate. And in practice, dependency decreases naturally as competence grows: pure AI generation in week 1, confident modification by month 1, writing simple code by month 3, using AI for boilerplate while writing critical parts independently by month 6. This is exactly how scaffolded learning works.

## "The Workshop Is Too Short"

Ninety minutes isn't enough to learn programming. That's correct, and we're not trying to. The workshop goal is to show what's possible, teach a verification framework, build confidence, and provide a path forward. It's an on-ramp, not a complete education.

The motivation argument is the key one. Traditional CS asks students to spend eight weeks on fundamentals. Most give up — the material is boring and abstract before it becomes useful. Vibes-first asks students to build something useful in 90 minutes. Some will continue learning afterward (intrinsic motivation). Even if only 20% continue, that's likely more than would have stuck with a traditional introduction.

No one expects 90 minutes to be sufficient. It's day 1 of a longer journey: apply to your own data in week 1, build your own tools in month 1, understand more deeply in month 3, develop a hybrid approach in month 6.

## The Honest Position

What we claim: vibes-first teaches real skills (specification, verification, iteration), lowers barriers (more people can access computational work), builds on learning theory, is appropriate for certain contexts (exploration, prototyping, personal projects), and can lead to deeper learning motivated by real use.

What we don't claim: vibes-first replaces traditional CS education for specialists, is appropriate for all contexts, eliminates the need for testing, makes everyone a software engineer, or constitutes a complete education.

The false dichotomy — traditional CS good, vibes-first bad (or vice versa) — doesn't hold. Both have value. Different audiences and different goals call for different approaches. A hybrid approach is often best. And the question we should be asking is not "Should we allow this?" but "How do we teach it responsibly?" This workshop, and these documents, are one attempt at an answer.

---

## Sources

- Kapur, Manu — "Productive Failure" research. https://www.tandfonline.com/doi/full/10.1080/07370008.2014.934190
- Lave, Jean & Wenger, Etienne — *Situated Learning: Legitimate Peripheral Participation* (1991). https://www.cambridge.org/core/books/situated-learning/6915ABD21C8E4619F750A6D7E5140995
- Willison, Simon — "Not all AI-assisted programming is vibe coding (but vibe coding rocks)." https://simonwillison.net/2025/Mar/19/vibe-coding/
- Bender, Emily M.; Gebru, Timnit; et al. — "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?" (2021). https://dl.acm.org/doi/10.1145/3442188.3445922
- Clark, Andy — "Extending Minds with Generative AI" — Nature Communications. https://www.nature.com/articles/s41467-025-59906-9

---

**Next:** [Vibes-First as Humanities Method →](06-humanities-method.md)

**Back to:** [Index](00-index.md)
