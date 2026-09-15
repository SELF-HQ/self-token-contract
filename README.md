# SELF Token

Fixed-supply ERC-20 on Ethereum.

| | |
|---|---|
| Name | SELF Token |
| Symbol | SELF |
| Decimals | 18 |
| Total supply | 500,000,000 SELF |
| Standard | ERC-20 (OpenZeppelin v5.4.0) |
| Network | Ethereum |
| Token | [`0xccc53048502f788EbA33b6488fee40041Cc5ADA9`](https://etherscan.io/address/0xccc53048502f788EbA33b6488fee40041Cc5ADA9#code) |
| Treasury | [`0x8b2fE271c13C94c679b1fF69466C2D6d034b2e8c`](https://etherscan.io/address/0x8b2fE271c13C94c679b1fF69466C2D6d034b2e8c) 2-of-3 Safe |

The entire 500,000,000 supply is minted once in the constructor to the 2-of-3 Safe. This contract has no owner and cannot mint, burn, pause, upgrade, or change any parameter after deploy. The Safe holds the tokens as an ordinary ERC-20 balance; it has no special rights in this contract.

## Compiler

| | |
|---|---|
| solc | `0.8.24+commit.e11b9ed9` |
| Optimizer | enabled, 200 runs |
| EVM | cancun |
| OpenZeppelin | `5.4.0` |
| Creation bytecode hash | `0xb09e697fc7e9fbc304dd9392d04d3fd82c0a6616d9cdb476869dec4fe52821f8` |
| Runtime bytecode hash | `0xc0914a78134313fd036a70114bda7184828df6864756f5302e2b20c762ab24ec` |

## Audit scope

```
contracts/SELFToken.sol
```

Flattened source: [`SELFToken.flattened.sol`](./SELFToken.flattened.sol)  
solc standard-JSON input: [`compiler-input.json`](./compiler-input.json)

## Build

```bash
npm install
npx hardhat compile
npx hardhat test
```

Deployed with `constructor(address treasury)` set to the Safe above.
