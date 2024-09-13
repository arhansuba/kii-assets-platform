// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title AssetToken
 * @dev Implements an ERC721 token for representing real-world assets on the blockchain
 */
contract AssetToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;

    struct Asset {
        string assetType;
        uint256 value;
        string location;
        uint256 creationTime;
    }

    mapping(uint256 => Asset) public assets;

    event AssetTokenized(uint256 indexed tokenId, address indexed owner, string assetType, uint256 value, string location);
    event AssetUpdated(uint256 indexed tokenId, uint256 newValue, string newLocation);

    constructor() ERC721("KiiChain Asset Token", "KAT") {}

    /**
     * @dev Tokenize a new asset
     * @param recipient The address that will own the new token
     * @param assetType The type of the asset being tokenized
     * @param value The value of the asset
     * @param location The location of the asset
     * @param tokenURI_ The URI containing metadata about the asset
     * @return The ID of the newly minted token
     */
    function tokenizeAsset(
        address recipient,
        string memory assetType,
        uint256 value,
        string memory location,
        string memory tokenURI_
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI_);

        assets[newTokenId] = Asset(assetType, value, location, block.timestamp);

        emit AssetTokenized(newTokenId, recipient, assetType, value, location);

        return newTokenId;
    }

    /**
     * @dev Get details of a specific asset
     * @param tokenId The ID of the token representing the asset
     * @return Asset struct containing asset details
     */
    function getAssetDetails(uint256 tokenId) public view returns (Asset memory) {
        require(_exists(tokenId), "Asset does not exist");
        return assets[tokenId];
    }

    /**
     * @dev Update the value and location of an asset
     * @param tokenId The ID of the token to update
     * @param newValue The new value of the asset
     * @param newLocation The new location of the asset
     */
    function updateAsset(uint256 tokenId, uint256 newValue, string memory newLocation) public onlyOwner {
        require(_exists(tokenId), "Asset does not exist");

        assets[tokenId].value = newValue;
        assets[tokenId].location = newLocation;

        emit AssetUpdated(tokenId, newValue, newLocation);
    }

    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}