# Schema Contract

Purpose:
Connect schema -> contracts -> specs -> generator.

Rules:
- schema is the structural contract
- contracts are the family-level contract
- specs are the machine-readable implementation source
- generator must read specs, not reinterpret docs
- plugin must render payload without flattening

Required links:
- schema -> contracts
- schema -> specs
- schema -> generator

Enforcement:
- no schema field may exist without contract ownership
- no contract field may exist without schema definition or explicit TODO
- no generator field may exist outside spec/schema contract

Required sections:
- schema ownership
- schema to contract mapping
- schema to spec mapping
- schema to generator mapping
- mismatch handling
