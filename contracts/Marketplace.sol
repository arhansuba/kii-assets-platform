// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    IERC721 public assetToken;
    uint256 public listingFee;

    struct Listing {
        uint256 tokenId;
        address seller;
        uint256 price;
        bool isActive;
    }

    mapping(uint256 => Listing) public listings;

    event AssetListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event AssetSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);
    event ListingCancelled(uint256 indexed tokenId, address indexed seller);
    event ListingFeeUpdated(uint256 newFee);

    constructor(address _assetTokenAddress, uint256 _listingFee) {
        assetToken = IERC721(_assetTokenAddress);
        listingFee = _listingFee;
    }

    function listAsset(uint256 tokenId, uint256 price) external payable nonReentrant {
        require(msg.value == listingFee, "Listing fee not provided");
        require(assetToken.ownerOf(tokenId) == msg.sender, "Not the owner of the token");
        require(assetToken.getApproved(tokenId) == address(this), "Marketplace not approved");
        require(price > 0, "Price must be greater than zero");

        listings[tokenId] = Listing(tokenId, msg.sender, price, true);

        emit AssetListed(tokenId, msg.sender, price);
    }

    function buyAsset(uint256 tokenId) external payable nonReentrant {
        Listing storage listing = listings[tokenId];
        require(listing.isActive, "Listing is not active");
        require(msg.value == listing.price, "Incorrect price");
        require(msg.sender != listing.seller, "Seller cannot buy their own asset");

        listing.isActive = false;

        assetToken.safeTransferFrom(listing.seller, msg.sender, tokenId);

        uint256 platformFee = (listing.price * 25) / 1000; // 2.5% platform fee
        uint256 sellerProceeds = listing.price - platformFee;

        payable(listing.seller).transfer(sellerProceeds);
        
        emit AssetSold(tokenId, listing.seller, msg.sender, listing.price);
    }

    function cancelListing(uint256 tokenId) external nonReentrant {
        Listing storage listing = listings[tokenId];
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.isActive, "Listing is not active");

        listing.isActive = false;

        emit ListingCancelled(tokenId, msg.sender);
    }

    function updateListingFee(uint256 _listingFee) external onlyOwner {
        listingFee = _listingFee;
        emit ListingFeeUpdated(_listingFee);
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        payable(owner()).transfer(balance);
    }

    function getListing(uint256 tokenId) external view returns (Listing memory) {
        return listings[tokenId];
    }
}