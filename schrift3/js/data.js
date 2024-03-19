const data = {
    approvalCount: Number(9),
    transferCount: Number(0),
    totalSupply: Number(150),
    tokenTransferCount: Number(4),
    tokenMintTimestamp: Number(5),
    lastTransferTimestamp: Number(2)
  };

    data.tokenToTotalTransferRatio = data.tokenTransferCount / data.transferCount;
    data.avgTimeBetweenTransfers = (data.tokenMintTimestamp - data.lastTransferTimestamp) / data.transferCount;
    data.normalizedApprovalCount = data.approvalCount / Math.sqrt(data.totalSupply);
    data.percentageOfTotalSupplyTransferred = (data.tokenTransferCount * 100) / data.totalSupply;

  data.mintDuration = data.tokenMintTimestamp - data.lastTransferTimestamp;
  data.relativeTradeVolume = (data.totalSupply * data.tokenTransferCount) / data.transferCount;
  
  data.averageTokenPerTrade = data.totalSupply / data.transferCount;
  data.tradeVolumeApprovalRatio = data.relativeTradeVolume / data.approvalCount;
  
  
  function sinNormalization(value, minRange, maxRange, int = false) {
    // Apply modified sigmoid function
    const sigmoid = Math.sin(value / 10) ** 2;

    // Scale and translate the result
    const result = sigmoid * maxRange + minRange;

    // Return integer if int is true, float otherwise
    return int ? Math.round(result) : result;
}
