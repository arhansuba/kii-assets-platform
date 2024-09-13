import { ethers } from 'ethers';
import { AssetToken__factory, Marketplace__factory } from '../typechain-types';
export class KiiChainService {
  private provider: ethers.providers.JsonRpcProvider; // Reverted back to ethers.providers.JsonRpcProvider
  private assetTokenContract: ethers.Contract;
  private marketplaceContract: ethers.Contract;

  constructor(
    private rpcUrl: string,
    private assetTokenAddress: string,
    private marketplaceAddress: string
  ) {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.assetTokenContract = AssetToken__factory.connect(assetTokenAddress, this.provider);
    this.marketplaceContract = Marketplace__factory.connect(marketplaceAddress, this.provider);
  }

  async getAssetDetails(tokenId: string): Promise<any> {
    return this.assetTokenContract.getAssetDetails(tokenId);
  }

  async listAsset(tokenId: string, price: string, sellerPrivateKey: string): Promise<ethers.ContractTransaction> {
    const signer = new ethers.Wallet(sellerPrivateKey, this.provider);
    const listingFee = await this.marketplaceContract.listingFee();
    return this.marketplaceContract.connect(signer).listAsset(tokenId, price, { value: listingFee });
  }

  async buyAsset(tokenId: string, price: string, buyerPrivateKey: string): Promise<ethers.ContractTransaction> {
    const signer = new ethers.Wallet(buyerPrivateKey, this.provider);
    return this.marketplaceContract.connect(signer).buyAsset(tokenId, { value: price });
  }

  // Add more methods as needed for interacting with KiiChain
}

export const kiiChainService = new KiiChainService(
  process.env.KIICHAIN_RPC_URL!,
  process.env.ASSET_TOKEN_ADDRESS!,
  process.env.MARKETPLACE_ADDRESS!
);