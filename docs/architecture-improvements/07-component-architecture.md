# 07 — Component Architecture

## Priority
🟢 Low

## Current Issues
- Some hardcoded values and ad hoc component structures
- Debug logging may leak into production paths

## Recommendation

Improve composability and consistency through extracted constants and shared patterns.

## Actions
1. Extract domain constants from large components
2. Introduce shared primitive components where repetition exists
3. Remove raw `console.log` calls and use a logger helper
