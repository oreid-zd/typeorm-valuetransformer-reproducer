import { ValueTransformer } from 'typeorm'

export class BinaryTransformer implements ValueTransformer {
  to(value: number | null): Buffer | null {
    if (!value) {
      return null
    }
    const buffer = Buffer.allocUnsafe(8)
    buffer.writeBigInt64BE(BigInt(value))
    return buffer
  }

  from(value: Buffer | null): number | null {
    if (!value) {
      return null
    }
    return Number(value.readBigInt64BE())
  }
}
