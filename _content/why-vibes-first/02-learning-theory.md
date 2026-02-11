---
sidebar_position: 2
nav_title: "Learning Theory"
---

# Learning Theory Foundations

## Overview

The vibes-first approach is not pedagogically novel. It draws on decades of research in learning sciences — constructionism, situated learning, cognitive apprenticeship, productive failure, and more. This document provides the academic grounding.

## Constructionism: Learning Through Making

Seymour Papert developed constructionism in the 1980s and 1990s as an extension of Piaget's constructivism.[1] The core insight is that learning happens most powerfully through building things — not through passive reception of information. As Papert and Harel put it, "Constructionism is learning through building things in the world while simultaneously building knowledge in the head."

The implications for vibes-first are direct. In traditional coding education, theory comes first, exercises come second, and meaningful projects arrive (if ever) weeks or months later. Motivation is extrinsic — grades, requirements. In vibes-first coding, the artifact comes immediately: working code in minutes, meaningful to the learner (a text analysis tool for a humanities scholar, say), and intrinsically motivating because you made something that does something. The pedagogical object isn't syntax mastery. It's agency and iteration. "Better learning will not come from finding better ways for the teacher to instruct," Papert wrote, "but from giving the learner better opportunities to construct." Vibes-first maximizes construction opportunities.

## Situated Learning: Legitimate Peripheral Participation

Jean Lave and Etienne Wenger studied how people learn in communities of practice and developed the concept of *legitimate peripheral participation*.[2] Newcomers begin at the periphery of real practice, doing authentic but simpler tasks. Their participation is legitimate — valued by the community — and they move toward full participation incrementally.

The classic model is apprenticeship. Traditional apprentices don't learn "theory of craftsmanship" first. They start with real tasks: sweeping the shop, observing the master, gradually taking on more complex work. Learning is embedded in practice, not abstracted from it.

This reframes what counts as "real" coding. Specifying intent is not "not coding yet" — it's a legitimate coding skill. Running code is not "just pressing play" — it's authentic practice. Debugging errors, testing outputs, reading code selectively — these are all forms of legitimate participation in coding practice. You don't need to be a full participant to participate legitimately. As Lave and Wenger wrote, "Legitimate peripheral participation provides learners with approximations of full participation that are appropriate to their evolving knowledge." Vibes-first makes peripheral participation in coding possible for people who would otherwise be excluded entirely.

## Cognitive Apprenticeship: Making Thinking Visible

Collins, Brown, and Newman extended traditional apprenticeship to cognitive domains.[3] The key problem they identified is that in cognitive work, the expert's thinking is invisible — it happens in the head. In traditional apprenticeship, you can watch a craftsperson work, see their techniques, imitate their movements. In cognitive domains, experts must deliberately articulate their reasoning so learners can observe expert *thinking*, not just expert *outputs*.

This points to both a limitation and a solution for vibes-first teaching. The limitation: the LLM does "craft work" at machine speed, and its reasoning is opaque. Students can't observe expert thinking by watching an AI generate code. The solution: the instructor makes verification thinking visible. "Before I run this, what will I check?" "This output looks wrong because..." "I'm reading this section first because..." "I'll test with this edge case because..." The LLM provides craft output; the instructor provides expert thinking. As Collins et al. put it, "Cognitive apprenticeship supports learning in a domain by enabling students to acquire, develop and use cognitive tools in authentic domain activity." Vibes-first coding plus instructor modeling is cognitive apprenticeship for AI-assisted work.

## Productive Failure: Struggle Before Instruction

Manu Kapur's research demonstrates a counter-intuitive finding: struggling with problems *before* receiving instruction leads to better learning than early success with scaffolded problems.[4] In productive failure, learners generate and explore solution methods for complex problems before receiving canonical instruction. The initial struggle activates prior knowledge, makes gaps visible, creates a *felt* need for new concepts (as opposed to an abstract need), and builds connections to failed attempts that deepen eventual understanding.

Vibes-first coding creates conditions for productive failure almost by design. The initial artifact is too complex to understand fully. Local failures occur — bugs, wrong outputs, confusion. The need becomes felt: "What is a list?" matters when your code breaks because of a list. Instruction is targeted: you learn what you need, when you need it. Understanding is deeper because it's connected to authentic struggle. As Kapur observed, "Productive failure suggests that the timing and sequencing of instructional support matters more than the amount of support." Vibes-first times instruction to follow experience, not precede it.

## How People Learn: Three Core Principles

The National Research Council's *How People Learn* (2000) synthesized decades of learning research into three key findings.[5]

First, students come with preconceptions. New understandings are built on existing foundations. You can't pour knowledge into empty heads — you must activate prior knowledge, connect new concepts to existing understanding, and address misconceptions. For humanities scholars learning to code, the prior knowledge is textual analysis, argument construction, and evidence verification. The connection is direct: code verification is like citation checking. The common misconception — "I have no relevant knowledge" — is false, because verification practices transfer.

Second, competence requires both factual knowledge and a conceptual framework. Facts alone (syntax, commands) don't create competence. You also need organizing frameworks (when to use what, why it works) and metacognitive awareness (knowing when you understand and when you don't). In vibes-first learning, facts come from the AI (it generates the syntax), frameworks come from experience (seeing patterns across examples), and metacognition comes from verification (the practice of checking your own understanding).

Third, metacognition is essential. Good learners know when they understand, know when they don't, can assess their own progress, and adjust strategies accordingly. Verification practices build metacognition naturally: "Does this work?" leads to "How do I know it works?" leads to "What would make me more confident?" This progression is built into vibes-first practice.

## Zone of Proximal Development: Scaffolding Growth

Vygotsky's Zone of Proximal Development (ZPD) describes three zones: what you can do alone, what you can do with help (the learning zone), and what you can't do yet.[6] The key concepts are the *More Knowledgeable Other* (anyone with higher skill — teacher, peer, or AI assistant) and *scaffolding* (temporary support that starts high and gradually withdraws as competence grows).

In vibes-first learning, AI provides scaffolding that is both infinite and patient. "Explain this code to me" — any time, unlimited. "Fix this error" — immediate feedback. "Show me how to modify this" — demonstration on demand. Early on, the student says "Write me a function that..." and the AI does everything. Later: "This function fails on empty strings — fix it." Later still: "I'll modify this myself, but explain why this approach works." The scaffolding gradually transfers agency to the learner. As Vygotsky wrote, "What a child can do with assistance today, she will be able to do by herself tomorrow." What a student can do with AI assistance today, they will understand — and eventually do independently — tomorrow.

## Use-Modify-Create: Progressive Scaffolding

Lee, Mauriello, Ahn, and Bederson adapted the Use-Modify-Create (UMC) progression for computational thinking.[7] The three stages are direct: *Use* means working with existing code — running it, seeing what it does, building intuition. *Modify* means changing parameters, adjusting code, testing variations, understanding cause and effect. *Create* means building from scratch (or with heavy AI assistance), combining learned patterns, designing new solutions.

This is the vibes-first progression almost exactly. AI generates code and you run it (Use). You ask AI to modify it and test the changes (Modify). You specify a new tool and verify it works (Create). Starting with Use provides a low barrier and immediate success. Moving to Modify connects actions to outcomes. Creating gives full authorship and authentic work. Lee et al. described UMC as scaffolding "student learning by providing a graduated pathway from low-floor entry points to high-ceiling creative achievements." Vibes-first follows this pathway naturally.

## Bricolage Programming: Conversation With the Machine

Sherry Turkle and Seymour Papert studied different programming styles and drew a crucial distinction between *planners* (top-down, formal, structured) and *bricoleurs* (bottom-up, exploratory, conversational).[8] The bricoleur, they wrote, "resembles the painter who stands back between brushstrokes, looks at the canvas, and only after this contemplation, decides what to do next." Bricoleurs navigate via mid-course corrections, treat programs as collaborative ventures with the machine, and experience programming as conversation rather than monologue.

Computing education has traditionally valued the planner approach — design first, code later, mistakes are missteps to avoid. But many successful programmers are bricoleurs: they explore, run code to see what happens, learn through interaction, and treat mistakes as information. Vibe coding is inherently bricolage. You generate code (brushstroke), run it (stand back), observe results (contemplate), and iterate (next brushstroke). It's a conversation: you tell the AI what you want, it gives you code, you run it, you see what happens, you ask for fixes — repeat. Turkle and Papert argued that education should support multiple ways of knowing, that bricolage is a valid epistemology, and that diverse approaches strengthen a field. Vibes-first legitimizes bricolage programming, which has always been a valid approach but was marginalized in traditional CS education.

## Synthesis

These theories are not in tension. They reinforce each other. Constructionism says: learn by making meaningful artifacts. Situated learning says: participate legitimately from the start. Cognitive apprenticeship says: make expert thinking visible. Productive failure says: struggle first, instruction when needed. *How People Learn* says: build on prior knowledge and develop metacognition. The ZPD says: AI can provide adjustable, patient scaffolding. Use-Modify-Create says: progress from use to creation. Bricolage says: conversational, exploratory approaches are valid.

The vibes-first sequence moves through all of these. Start with a complex artifact (constructionism: immediate meaningful object; situated learning: authentic participation). Run and observe (bricolage: conversational exploration; UMC: the "use" stage). Encounter failures (productive failure: creates need for concepts; ZPD: you're in the learning zone). Verify and test (cognitive apprenticeship: expert thinking made visible; *How People Learn*: metacognition). Unpack concepts as needed (just-in-time instruction; building conceptual framework). Modify and extend (UMC: the "modify" stage; constructionism: deepening through construction). Create your own (UMC: "create" stage; situated learning: moving toward full participation).

This sequence isn't ad hoc. It's pedagogically grounded at every step.

## What Students Learn (That Traditional CS Often Misses)

Vibes-first emphasizes specification literacy (what do I actually want?), verification practices (how do I know it works?), debugging conversations (how do I fix it?), iterative refinement (good enough, then better, then best), working with uncertainty (operating under partial understanding), and appropriate abstraction (what do I need to know versus what can I trust?). Traditional CS emphasizes syntax mastery, algorithm knowledge, data structure implementation, and optimization techniques. Both are valuable. Neither is "real" programming with the other "fake." They're different skills for different contexts.

The skeptic who says "they won't really learn" is worth engaging. The response from learning theory is that they *are* learning — just not the same things in the same order. They're learning by making (constructionism). They're participating legitimately in coding practice (situated learning). With instructor modeling, they're learning expert thinking even if not doing expert implementation (cognitive apprenticeship). Their initial struggle with complex code prepares them for deeper understanding (productive failure). They're building on prior knowledge and developing metacognition (*How People Learn*). The AI scaffolds work beyond their independent capability, which is exactly the learning zone (ZPD). And they're progressing through a well-established scaffold toward creation (UMC). This sequence is not the same as traditional CS education. But it is sound.

---

## Sources

[1] Papert, Seymour & Harel, Idit — "Situating Constructionism" (1991). http://www.papert.org/articles/SituatingConstructionism.html

[2] Lave, Jean & Wenger, Etienne — *Situated Learning: Legitimate Peripheral Participation* (1991). Cambridge University Press. https://www.cambridge.org/core/books/situated-learning/6915ABD21C8E4619F750A6D7E5140995

[3] Collins, Allan; Brown, John Seely; Newman, Susan E. — "Cognitive Apprenticeship: Teaching the Crafts of Reading, Writing, and Mathematics" (1989). https://www.ideals.illinois.edu/items/17965

[4] Kapur, Manu — "Productive Failure" in Learning. https://www.tandfonline.com/doi/full/10.1080/07370008.2014.934190

[5] National Research Council — *How People Learn: Brain, Mind, Experience, and School* (2000). National Academies Press. https://nap.nationalacademies.org/catalog/9853/how-people-learn-brain-mind-experience-and-school-expanded-edition

[6] Vygotsky, Lev — "Zone of Proximal Development." https://www.simplypsychology.org/zone-of-proximal-development.html

[7] Lee, Irene; et al. — "How Use-Modify-Create Brings Middle Grades Students to Computational Thinking" (2023). https://www.researchgate.net/publication/375606269_How_Use-Modify-Create_Brings_Middle_Grades_Students_To_Computational_Thinking

[8] Turkle, Sherry & Papert, Seymour — "Epistemological Pluralism: Styles and Voices within the Computer Culture" (1990). https://slab.org/2010/06/13/bricolage-programming-2/

---

**Next:** [Analogies That Land →](03-analogies.md)

**Back to:** [Index](00-index.md)
