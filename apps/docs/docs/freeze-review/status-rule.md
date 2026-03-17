# Status Rule

Purpose:
Define allowed status values and reason values for freeze review.

Allowed status values:
- not started
- in progress
- pending
- verified
- blocked

Allowed reason values:
- pending (spec mismatch)
- pending (generator mismatch)
- pending (plugin mismatch)
- pending (token mismatch)
- pending (payload mismatch)
- pending (inspection mismatch)
- pending (canvas not verified)
- blocked (write path unavailable)
- blocked (inspection missing)
- verified

Rules:
- every P1 family must appear in status.md
- every P1 family must have Phase A and Phase B status
- every pending or blocked row must include an explicit reason
- P2 may not start until all P1 families satisfy the P1 completion gate
