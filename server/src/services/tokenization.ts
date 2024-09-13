import { ethers } from 'ethers';
import { AssetToken__factory } from '../typechain-types';
import { IAsset } from '../models/Asset';

export class TokenizationService {
  private assetTokenContract: ethers.Contract;

  constructor(private assetTokenAddress: string) {
    const rpcUrl = process.env.KIICHAIN_RPC_URL;
    if (!rpcUrl) {
      throw new Error('KIICHAIN_RPC_URL environment variable is not defined');
    }
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.assetTokenContract = AssetToken__factory.connect(assetTokenAddress, provider);
  }
  async tokenizeAsset(asset: IAsset, ownerPrivateKey: string): Promise<string> {
    const signer = new ethers.Wallet(ownerPrivateKey, this.assetTokenContract.provider as ethers.providers.Provider);
    const connectedContract = AssetToken__factory.connect(this.assetTokenAddress, signer);

    const tx = await connectedContract.tokenizeAsset(
      asset.owner,
      asset.assetType,
      ethers.utils.parseEther(asset.value.toString()),
      asset.location,
      asset.metadata,
    );
    const receipt = await tx.wait();
    const event = receipt?.logs.find((log: any) => {
      try {
        const parsed = connectedContract.interface.parseLog(log);
        return parsed?.name === 'AssetTokenized';
      } catch {
        return false;
      }
    });
    
    if (!event) {
      throw new Error('AssetTokenized event not found in transaction receipt');
    }

    const parsedEvent = connectedContract.interface.parseLog(event);
    return parsedEvent.args.tokenId.toString();
  }

  async getTokenUri(tokenId: string): Promise<string> {
    return this.assetTokenContract.tokenURI(tokenId);
  }

  // Add more methods as needed for tokenization-related operations
}

const assetTokenAddress = process.env.ASSET_TOKEN_ADDRESS;
if (!assetTokenAddress) {
  throw new Error('ASSET_TOKEN_ADDRESS is not defined');
}
export const tokenizationService = new TokenizationService(assetTokenAddress);