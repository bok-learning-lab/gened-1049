---
sidebar_position: 4
nav_title: "Practical Strategies"
---

# Practical Strategies for Responsible Vibe Coding

## Overview

Theory matters, but practice is what makes vibes-first coding responsible rather than reckless. This document provides concrete, actionable strategies — meta-skills that turn "I ran some AI code" into "I verified, tested, and can stand behind this work."

## 1. Specification Literacy: Prompting as Requirements Writing

When you ask an AI for code, you're not just chatting. You're writing requirements. The quality of what you get back depends directly on the quality of what you ask for.

A good specification includes five things: *inputs* (what goes in), *outputs* (what comes out), *examples* (showing rather than just telling), *constraints* (what it must not do), and *success criteria* (how you'll know it works). Compare two approaches:

Vague: "Make a word counter."

Specific:
```
Write me a Python function that analyzes word frequency in biblical texts:

INPUTS:
- Takes a string (the text) and an integer (top N words to return)
- Example: analyze_words(genesis_text, 10)

PROCESS:
- Count all words, case-insensitive
- Remove common words (the, a, and, etc.)
- Handle punctuation (remove or ignore)
- Return top N most frequent words

OUTPUTS:
- Returns a list of tuples: [(word, count), (word, count), ...]
- Example: [('God', 32), ('earth', 14), ...]

SUCCESS TEST:
- When I run it on Genesis 1 asking for top 5 words
- 'God' should be first (appears ~30 times)
- 'earth' and 'light' should be in top 5

CONTEXT:
- Using Python 3 in Jupyter notebook
- I'm a humanities scholar, new to coding
```

The AI now knows exactly what you want, how to test it, what edge cases to handle, and who you are. Result: better code, fewer iterations.

A few specification patterns worth internalizing. "Smallest working version first": ask for the simplest version that works, then add features one at a time. "Example-driven": provide three examples of inputs and expected outputs and ask for code that handles them. "Testing built in": ask the AI to include a test function that verifies the code works on your examples.

## 2. Verification Literacy: Trust Through Testing

Trust is earned, not given. Even perfectly generated code must be verified.

Verification has a natural hierarchy, and you don't always need every level — but you should know which level your situation demands.

**Level 1 — Does it run?** Just execute it. This catches syntax errors, import problems, and basic crashes.

**Level 2 — Does it return something?** Check that output exists and has the right type:
```python
result = count_words(text)
print(f"Got result: {result}")
print(f"Type: {type(result)}")
```

**Level 3 — Does it look plausible?** Inspect the output for reasonableness:
```python
result = count_words(genesis_text)
print(f"Top 5 words: {result[:5]}")
print(f"Total unique words: {len(result)}")
```

**Level 4 — Does it match known cases?** Test against answers you calculated by hand:
```python
result = count_words("the cat and the dog")
assert 'the' in [word for word, count in result]
assert result[0][1] == 2  # 'the' appears twice
```

**Level 5 — Does it handle edge cases?** Probe boundaries and unusual inputs:
```python
assert count_words("") == []           # empty
assert count_words("!!!") == []        # no words
assert count_words("God god GOD") == [('god', 3)]  # case insensitive
```

How deep you go depends on context. A quick prototype needs Levels 1-2. Research use needs 1-4. Publication-grade work needs all five. Production systems need all five plus code review.

**Instrumentation** — adding print statements to see what's happening inside — is one of the most powerful verification tools:

```python
def count_words(text, top_n=10):
    print(f"Input length: {len(text)} characters")
    words = text.lower().split()
    print(f"Found {len(words)} total words")
    filtered = [w for w in words if w not in stopwords]
    print(f"After filtering: {len(filtered)} words")
    counts = Counter(filtered)
    print(f"Unique words: {len(counts)}")
    return counts.most_common(top_n)
```

When something goes wrong, instrumentation tells you *where*.

**The oracle pattern** means finding a source of truth to check against: a manual calculation for small input, an alternative tool (compare against ChatGPT's analysis), a known dataset with published results, or an inverse operation (encode then decode, which should match the original).

**Spot-checking** means strategic sampling of large outputs. You can't verify everything, but you can verify enough to build confidence:
```python
# Process all Bible chapters, then spot-check a few you know
print(results['Genesis 1'])   # Should have 'God' near top
print(results['Psalm 23'])    # Should have 'Lord' or 'shepherd'
print(results['John 1'])      # Should have 'word' or 'beginning'
```

## 3. Debugging Literacy: Conversing With Failures

Errors are information, not failure. When code breaks, you're learning where the boundaries are.

**Step 1: Read the error carefully.** Python error messages are more informative than they look:
```
Traceback (most recent call last):
  File "script.py", line 12, in <module>
    result = count_words(text)
  File "script.py", line 5, in count_words
    words = text.lower().split()
AttributeError: 'NoneType' object has no attribute 'lower'
```
This tells you *what* (AttributeError), *where* (line 5, in count_words), and *why* (`text` is `None`, but you're trying to call `.lower()` on it).

**Step 2: Form hypotheses.** What could cause this? Most likely: you passed `None` to the function. Less likely: a variable is accidentally set to `None`. Least likely: an upstream function returned `None` unexpectedly.

**Step 3: Test hypotheses.** Add a check before the call:
```python
print(f"Text value: {text}")
print(f"Text type: {type(text)}")
result = count_words(text)
```

**Step 4: Ask AI for help — with context.** Don't just paste the error. Provide the full error, your code, what you were trying to do, and your hypothesis about the problem. The more context you give, the better the help you get.

**The minimal reproduction pattern**: when debugging, isolate the problem. Don't debug a complex chain of function calls. Test the simplest case first: `count_words("simple test input")`. Fewer variables means easier diagnosis.

**The "change one thing" rule**: when code is broken, change one thing, test, repeat. Don't change three things at once — you won't know which change fixed (or broke) it.

Common error patterns worth recognizing:

| Error | What it means |
|-------|---------------|
| `NameError: name 'X' is not defined` | Variable doesn't exist — check spelling or imports |
| `TypeError: X() missing 1 required argument` | Forgot to pass an argument |
| `IndexError: list index out of range` | Tried to access an element beyond the list |
| `KeyError: 'X'` | Dictionary doesn't have that key |
| `AttributeError: 'X' has no attribute 'Y'` | Wrong type or wrong method name |

## 4. Selective Reading Literacy: Strategic Code Review

You don't need to read every line of code to work responsibly with it. You need to read strategically, at the right depth for your situation.

**Level 1 — Skim (30 seconds).** What does this do? How long is it? Does it import anything dangerous? A quick scan of imports and function names tells you a lot:
```python
import requests      # Makes network calls — worth noting
import os            # Can access filesystem — worth noting
from collections import Counter  # Safe, standard library
```

**Level 2 — Structural (2-3 minutes).** What's the entry point? What's the data flow — input to process to output? What are the major sections? You can understand the architecture without reading every line.

**Level 3 — Danger zones (5 minutes).** Look specifically for file operations (`open()`, `write()`, `delete()`), network calls (`requests`, `urllib`), system commands (`os.system()`, `subprocess`), credentials (API keys, passwords), and data deletion (`.delete()`, `.drop()`, `.remove()`). Read these sections carefully. Skim the rest.

**Level 4 — Deep dive (15+ minutes).** Only when you need to modify the code, it's broken and you're debugging, stakes are high (publication, production), or you're genuinely curious.

The progressive reading pattern: start with Level 1. If it works, you may be done. If not, move to Level 2. Still confused? Level 3. Need to modify it? Level 4. Don't start at Level 4 and work your way there only if needed.

You can also ask AI to help you read. "Explain this code in three levels: what it does overall (one sentence), the major steps (3-5 points), and what the key functions do." Or: "Identify any dangerous operations in this code." Or: "What would happen if I changed this line to that?"

## 5. Maintenance Literacy: Keeping Systems Accountable

Code that matters must be maintainable. This means documentation, testing, and clarity — and it doesn't require deep implementation knowledge.

**Document at the end of each session** (5 minutes). Create a `README.md` or `NOTES.md` that says what the code does, how to run it, what its known limitations are, and when it was last updated. Future you — or anyone else who needs to pick this up — will thank you.

**Test critical paths** (10 minutes). Write 2-3 simple tests: does basic counting work? Is it case-insensitive? Does it handle empty input without crashing? These tests serve as a safety net: you'll know if future changes break existing functionality.

**Refactor for clarity gradually.** When you revisit code, rename unclear variables (`x` → `word_count`), extract repeated logic into functions, add docstrings, remove dead code. You don't need to do this all at once. Small improvements accumulate.

**The "future you" test**: before moving on, ask whether you could understand this code in six months, whether a colleague could understand it, whether you'd trust it for publication, and whether you can verify it still works. If any answer is no, add documentation, comments, tests, or examples.

**Be honest about code quality.** When code is a quick prototype, say so explicitly in a comment: "WARNING: This is a quick prototype for exploratory analysis. DO NOT use for production or publication without review." Honesty about code quality prevents future problems.

## The Meta-Pattern

All five literacies follow the same underlying pattern: specify clearly (know what you want), verify systematically (check it works), debug iteratively (fix what's broken), read strategically (understand what matters), and document honestly (enable future use). This is how professionals work. The difference is that professionals might write the code themselves (or might use AI). But the verification, debugging, reading, and documentation processes are the same regardless. Vibes-first teaches professional practices from day one.

---

## Sources

These practical strategies are synthesized from:

- Willison, Simon — "Not all AI-assisted programming is vibe coding (but vibe coding rocks)." https://simonwillison.net/2025/Mar/19/vibe-coding/
- Basch, Diego — "Vibe Coding and the Law of Leaky Abstractions." https://diegobasch.com/vibe-coding-and-the-law-of-leaky-abstractions
- Software engineering best practices literature on testing, debugging, and code review
- Professional developer workflows and practices

---

**Next:** [Addressing Skeptics →](05-addressing-skeptics.md)

**Back to:** [Index](00-index.md)
