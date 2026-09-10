export class PublicKey {
  private _val: string;
  constructor(value: string | PublicKey) {
    if (typeof value === 'string') {
      if (value.length < 32 || value.length > 44) {
        throw new Error('Invalid public key');
      }
      this._val = value;
    } else if (value && (value as PublicKey).toBase58) {
      this._val = (value as PublicKey).toBase58();
    } else {
      throw new Error('Invalid public key');
    }
  }

  toBase58(): string {
    return this._val;
  }

  toString(): string {
    return this._val;
  }

  equals(other: PublicKey): boolean {
    return this._val === (other?.toBase58?.() ?? other?.toString?.());
  }
}

export class Keypair {
  publicKey = new PublicKey('11111111111111111111111111111111');
  secretKey = new Uint8Array(64);
  static generate() {
    return new Keypair();
  }
  static fromSecretKey() {
    return new Keypair();
  }
}

export class Connection {
  rpcUrl: string;
  commitment?: string;
  constructor(rpcUrl: string, commitment?: string) {
    this.rpcUrl = rpcUrl;
    this.commitment = commitment;
  }
  async getBalance() {
    return 1000000000;
  }
  async getLatestBlockhash() {
    return { blockhash: 'mock-blockhash', lastValidBlockHeight: 1000 };
  }
  async sendTransaction() {
    return 'mock-tx-hash';
  }
  async confirmTransaction() {
    return { value: { err: null } };
  }
}

export const LAMPORTS_PER_SOL = 1000000000;
