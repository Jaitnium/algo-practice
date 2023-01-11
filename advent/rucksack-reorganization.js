// Return the priority of the given item (character)
const priority = (item) => {
  let ascii = item.charCodeAt(0);
  // If a-Z
  if(97 <= ascii && ascii <= 122) {
    // Convert back to 1-26 range
    return ascii - 96;
  }
  // If A-Z
  else if(65 <= ascii && ascii <= 90) {
     // Convert back to 27 - 52 range
     return ascii - 38;   
  }
}

const rucksackReorganization = (sack) => {
  let totalScore = 0;
  // For each pair of compartments
  for(let i = 0; i < sack.length; i++) {
    // Tally obj
    const tally = {};
    const overlap = {};

    // First compartment
    for(let j = 0; j < sack[i].length/2; j++) {
      tally[sack[i][j]] = tally[sack[i][j]] ? tally[sack[i][j]] + 1 : 1;
    }
    // Second compartment
    for (let j = sack[i].length/2; j < sack[i].length; j++) {
      // Track any overlap
      // If this char overlaps and isn't in overlap object
      if(tally[sack[i][j]] && !overlap[sack[i][j]]) {
        overlap[sack[i][j]] = priority(sack[i][j]);
      }
    }
    // Increment the score by the overlapping item's priority
    totalScore += Object.values(overlap).reduce((prev, curr) => prev + curr);
  }
  return totalScore;
}

const stickerAuthentication = (sack) => {

  let totalScore = 0;

  const intersection = (arrays) => {
    return arrays.reduce((accum, curr) => {
      const shared = [];
      for(let i = 0; i < curr.length; i++) {
        if(accum.includes(curr[i])) {
          shared.push(curr[i]);
        }
      }
      return shared;
    }, arrays[0])
  }

  for(let i = 0; i < sack.length; i += 3) {
    let output = intersection([sack[i].split(''), sack[i + 1].split(''), sack[i + 2].split('')]);
    [...new Set(output)].forEach((ele) => totalScore += priority(ele));
  }
  return totalScore;
}
/*
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
*/

const parseInput = (input) => {
  return input.split('\n').filter((ele) => ele.length);
}
const input = `shzsFcPssFhjFssBzdpRcNHNZrpdJdJVJZ
fwvMCntfCCbSbSbtDgDNrDtDtJHZVH
GbCwwbwwnGrLhBzjFFFsWPhL
PpCqRsqqmmtCwMJC
LHFrLLHDSNHlfWNhDzmjzzJlJzPJMvPJjQ
SGSWDNrhZhPDSWDZLgVVRgbRppgpGVnpnn
GRRjbVjmJZlgMRzzrN
FpDptHpfHfnpPTvDFTWpFPnPcMfNCClNrzcVcrMMzVsCZlsZ
TFTQDnvLHPFDtVbLwbjdGjdwwJ
lhljvvhCjjzhjszzBPmnmGVZMGzG
FbTcTwbtSFdtcMPnTBPQVnnBZT
SFMpHDtNDSSbSdwppvgJWjJCJJgWgvlJHH
wzNCWpzCzJnWWpRRNdJrgHLhjfbLrHrchV
lBMStmPmmLQDPQZlshrdhgrfrcrrddgHgs
mvGDGQSvDPBlGMLGCvCWpNvpzRWFwqRw
stBttBThtDZqPWssPWZp
gRggwwggCGFSBBvPRpHZZrHdZLZq
ccFJGCNJmmGQzbTDhnQhBBnB
HJqMqtZbJMmJTqtLtVMqhpfphNdQfhfzzjhhlHll
rWSBrnwFwWCvwWCwBgPgCgzjQccQhhgRzcdQzjfcNfzR
CWBCwCvCvvwssWLMtJJGMdMZJsGV
nFwSFQwsNrrsssSwCrhrCNnfcCRgJRMJTJcMfRzMCMCRvW
DdbGdLZLttllWWvTzgzzgR
ZqGzPdLtDjBjDZGPZVmnhQFwqrFQhVFnss
sNNpCjttjsJjSpgpWjslCTnqqSVffrnhSfDhmhrhfm
dBwcGzbPBHbbwZcwJbcTTFDFFFDVrdVmFdnDqf
HzGcczQPHGwzPzGHRctWlvRgtvJlvNlJvRNj
cFNCFdvcCHvFBCZcwBfRSpttGhDmCghGShmSRt
QjLnTTzQVzTTnLMqhDgPhGDDSjGPrgSh
TTJGnJJlLQdNWZWJNBJZ
WHBpHcMDZHLDbHLtGCnmRmLNGmRqvsCC
PzTFzPPTJzrSbGsvnmqfsqfqRz
dJSQQdVFQgjTrjQPWcWHbBVcZVccZtWp
JDtnRtJzNzTTNlHc
rQPJFrLPGMMwrGPFwjFMVLjSTWHdWBTdSWdWZlcWTHlZ
MGFrCvLLwrwPFVVhvLMGGtnqfsmRJgDnqbRgfbqmfC
jnTtFjcSSvctJjznzvFmpqqPMqQDRVpRqPzqQzVQ
bhHBfrWpfHsfGNllRrRCPqDCqPqq
gsGZZpbWgbwHWGNgfZNjvLSTTjtnTgjSSSSJmL
RLQNdVNnRQdQHVVLGpspNqvtsqptqpTtsp
MlRWwbRBBFMFjCTFTTFDvj
WmlWBmBwwmrndnmLRHRQ
WnftJWlfnWSHGCjWWWSCFqFGBDqBwMcDmmMmGmqD
pTNhpTrPhhhRPzbhrppLhThLgqDmwccwqPBmMMqnFBcwwmBB
ZrhQTpzdjSVVtnvZ
jgtnJtBjtlTdJBZJVQBngQGDCGWpPGCcPWCbWdWMbcpP
wHstNNttSHPDmHcMCp
rrFFSvLLNfsFtNSqrtfrhsNjjVTBVgVvnTBvTQvjTgjVZz
qhZwlqFqFwlJwrDHqHcDvgcNzv
RCCTQmjCbQTBtRTbjJRDpBrgDHPPpPDvHccDPc
VmjVWstQJhlJlGVJ
GggpGwZmgvgJMvbJFQQDbDFbBbFCQDCW
rtrLzNLtNSPnNqDSQDcQCWlqBQ
VtzdRPtztLtVRtZmmMTRwCGZpMwp
vtvqjsCqtshfjcWFHWGjGFJj
zGrnzDDMpPcTHcSTVTJP
DbDwMbZRDrZdBBnMznZMGZDfwtlgQhsqCttClsqvsLfCff
JLzLtLsrzsQdvrWRwMHwcc
qPmCTzlPjljjFTZmWwcwwvHMMRWwHvMm
PFqZnVCqTCNjCzNgQsbGBLzLQQ
CBnppDHllVpPCBshBHpjDTSmZcSrfwvmJcDDTJfw
dFRLdLFQzNSTBTSNmBJv
FzFFzRMBFWtQlPlsjjPVMnhC
CVCfwnfdVvBdBbTNTT
LNzsHPNWsDjTZqDHqT
PtLgQsGQLSzWLstPgGWcgQLSNrpplffrnrNhpVCwlGVlrwMn
jPPVqPsHffzVnHzvSgMcCJGGMSVCll
pdbpDpBLNmNNppJgcvgSllGjDSGQ
hrbBwLpjLhhhNZLhNrhZZLHzfsztFzzsrtHfRFnFfRHf
tdjBdbmSfdHBdHHmZlWjFrnlWQlqvMFvFn
pDNDJhLhPVPLLLJphJLwNcwnQTcWWTqTrqMWTZvqMrlvFM
gpVLhNwpgZJCghCLDNwphgmsBdzHHHmSstmfggzdbR
TfMpfMBVftLMDBSjWDHgzHbgwLgHHvdzggzs
QJnZcFFnZRHdHjJvwgdg
RjjRRnmNmmZNjZqZnQcVffBrWqVTqrtffTSTVV
fZTdTVcVjrjdBzdTnGtgnnGSHHNFGn
thMWPtPMslmGnWnNnS
thvbMvQMRphhLCjrzBjZVdcQfC
MpmgZFgMGdrFrBCVnJ
JsbJlTTlvLQbVffRRvBBRVjd
LWlbhHlJhLTJmmGcMMHNmNgN
bhvmhPrbhqNqQRRGzQjVvvRL
wTwBZDBTwwggfnngcDfdsVVFQCdzCzDVRsFdQs
pngWMcgzMgpZWncnMpWNrbNHrNbmHhltWlbl
nPndBjLPscWSccBVGnScsSzMdhMppMthdMgpMgrzvhhp
CCFTFDwqZqCCJmhvpDzztVzDNztp
qQFJTbRVbmCfwTwfmnnssWBGnLnWlRLSGn
JRlJDSvLRRCdvmDSvdlbZNVBSWZGNgWsZGNgZBVs
QrjPMqMnLzzjLjFnNNgBpsgtgGGGVZ
hrjrFqjqFrQfMHPhQzDvvCLJdwwwmvbJbwDH
HDGrDDDpNsGQNdZQ
jpjgtgjSjpjllfZZtZsvNdtshqqq
cbgMfjclWTJcMwjWJfpfmVPLPBnVBHnmVbnmLBbD
rPrMZNsNrsvrwqvFFFdgQWNzLJJzRW
pStppStHmcmHpgVSllVcbVbWWDdLFhdbzdRRFhJFLLRF
cltCHmCBmtSlgjpllgGvTwPZPMfZvPsCMCwZvC
FRQQMdlFMDWRFQRQMQQDWdFbSSSVJSBbJSlBVVBnPJnzJL
rsftPfhsrgwznSzzHSLgJG
fhNsjrjhvsTTvdjcCRMRMRPcCW
tRtJttHFrjtDQHHBQMMBgMBSghhZQb
vqWPLpLvqrmPdmqwvqfmPhNBBBlSnbwbgnlnlhNSZZ
pGpdfzLLspddmqsqPvfvvPpGTVcJJCDRjHrccRtDjcRDFD
GJMHCdTMWJRhSTlhhSPllt
fVvqpfBFrqvqNzzgVDFrpDPmSVtQSlSmhjwltlRtmVhn
pzpBNDBzfDrsNsDRJJRdCssMLdLZWZ
hFfvWWvdpCwwcwFhphpcZCMmllHLfmbQlbrQLBJmGgQrQm
nVSNGjGzzSVNTsjzSJrbSrHBSHlrrmQHJB
PttTNsTRVnNjNqRnzRzRWCCCcpMCWGPMwwFZvFwW
DvZbFnDDsqDBwwRQgNBm
HhWpWWRMWChlChdHLlGlGtQtggSNPSSpgPmNgPJQtw
CMlWGMhhCVHlLCdHTHdrGHdbzjVqnzcvqqjRjFbbzbFFqR
ZZgCNqqBmjZsNgZCqJgNBdrLFHbBrWlPdHWFbPnHPW
TVwTDfzDwSDzmcSTcrzdbllnHPHdFlLzbF
tvDQwVtVvDVmtRsNMgRpJg
BBpDCpNJnmnpnDDmDGGmtTzqHcGTvTTjTbGjHLVcLb
swNNhPwwHzTVwwHw
rPRlPRhSQmmBDpnNfl
pbRhffPzcPDmfcNTpVBLpBjMGBGjZLLg
ssrCsqrszgJjZMqZLQ
SzCwnsllCrssvdrvwzPmDmPPbFRbSThPTPDD
QWLfcfczQQpcDTpLPfdZRRvRRVqbFWvZbvtqvv
NsGGJBhCmNdZVqsbdssZ
rMwwwBBJMrdzPfQMpzMnLQ
rdtCQhrCtQQprtTWQCHFjPgGBPdFPgvBqRRPqB
lsVsSnVSbLmmgBcgTLTFGgvq
wTTDTszsbzMDppJrJhDQ
ZlmsGLBVCBBZFCFFHqcHVvQhqVQSSHpH
dbbTRMrRwwzDfrTbFtMvcptvHFQQpqtc
gdJTDWgfwDwTwmgmNPnNsgFBlZ
PWhWhGFzzzrLdHCPccbJQJcHPD
NRpVTpTgRWVlHJNHMcHQMb
pSRSpVSZWRSTZjgTRTWnFLdZLrrndhdzZvtvzn
LgctLgVBVLhlPjqRhBLVcVlhbDDcGnNGfwCrbNDnrGbGCJNw
HmppHMWWmQmMqZZHWQrDDfDCffJrDGJrCb
qpWZsZZZMZWTLPhTRgTtThRP
hfhQfFQWzBfhfTQdmzdLDtDjtvHLjt
qsgpcqMNRmgpqsCwpCmZDvjwvdddHZHvZDtrrd
SgmNmqScbTSJbhJQ
dvMTQvTnZJsrQdbbSvMVZMblDwlflfDGgwwHcfGjPfjjrG
FqBLpBpFpFzRzqNFmgjGlDRHcwPPGwgcgs
tLNtWshsLLqWMJhTQVVbhvJd
bgZLMZgzbbLCcPCbMZbcNMgBqSTqSWVtSzvvTTBTqBvRBW
FhQpJQnGrlhGlrnTqRtTRJqSwDwtVR
FqlnnFnqFHnGHHdNZdbZbCNMdPLMPb
HHFnbftcfnfbbTbTnHTNVZZzJlPQlFrFzVJFZsdr
mvpGCBgwqCvLCqvMQWWzsQQWlPzwzsrV
hpGSGgqSvqbHcnhfVfct
lGVrnHsGcnVHzscrlGjHcrHqqWPlJCPJClTLLqCSPLPdqS
fRbwbtMQZtMMRFMSqfJTTWCTJPJCmd
ggdvtvdbVVGnpDGg
BnBjTcbnvhjjlMnNJJfnDnQDGdNDfP
qwFqVSWwqLpWFmFVCSqFpDDCJNJRQTRfRDGPfdfDQN
zwHwWVVWWFSqqwWTLqzzztHMvBhlcghblMlcttMllh
PFFNPNPmlFllbctNLmcjBstrsVrQHJSSHHSnnB
fddfDhdwGhTWWTDMwMggssjsjndsBsjsnSrVqSVV
MCvvTWvRMwCvGPpzCcmbplpCVC
thTqlPPTNbGNhGdqRRhRrNtFWnDnvvFZDpnFvfQDZtvWvv
HcMzVcVVcHrgHzcMcmmgfQvFQnMjnWDjfnvjQFfQ
VSmHJLHBJrTrJTlT
NjnsHjLLjNRddNdBFBSR
ftsbqfDcDqsrDtqsfSVBhJVFJgdBRVFS
wvDqwtDlsDDczjzjHvLzLQQM
qDwstwDtRfpJfVhBVZBMvnlRvv
zSFzQHFWdgZBVTZhTzrp
NHdggjGjWHQFPWHNPPbpJfPDtCwCtqDqJfbt
pvnbqHvnTvlCCpjsBsMGBGWWPp
RJSJhJCRVJmJwScrhSJdfwFsBGhZBjhGFFFFGgFPGhZW
cdRrdmwtfcdSmLtcSCQlvQNqQTlqqvtTlv
rnSlSrgWjVGpTTRhSffpRd
HtgHPsNNgNHszPcTBphMdhHhBcTc
JNNbZPZZsszNmtDbPgsmJlwFvWVnCwrlmWlnjnGvCC
WrVBVgVGGQCrSTTqvVjDqDjv
FmwRRwwRQhhLFMjFMzdqSSzS
RcJtbnnLtQWrGHcfrP
vpzssjmVjVZWNZzzQwtQwccpQhgtQCct
qDdfLMnMrrTbBLqTqltlTfbGQnghgRwggGgRnhhccCJJcG
MtdLfSSSddMftlrjjzsSWVSjFvjNvs
qTRPpRPzJglzGJzpGRHWHljwDtbwffjtbhjfwNfHmwwf
SZLVdsvrrdFdBcdZvsBdDCNtbmftNwfNbNhCNvtz
MLzzddLsQRppRlQGPq
PDDpdJgtpppGgttgdGdgJFzLjVcvVnnCTrVrRPTLvwnTTC
ZSbHBsSNlZcsfNnnvRrnVjrHwvCC
NmSmsfsfhmzcDmctJW
NbrLfrrLqpqWQHtBzbFttJgcgB
CmwjPPjjjShPvljwvwwjPBFttBtcHzFJcHTRHJRRmT
CCljjDGhvPCVdVSCdPvrrNfnnQsGqMpqqMqnFW
bdPdbcDZlddsZbHjrrgrmZmCZhCGjv
BffLfLVFVMMBRfwMpfzhFGFhGWvWvrhNvvNj
RMBpRSnffBJjSbJqdPHsDcbqtl
BgwGwDDZttDDTNND
WzNNnFRWFtTFlFsh
WJjPpPqqzWRbrqnNqvVvgvvdcBwgdrVBZG
FFbMVMFPvJppgvcvrZMjHlCJWHmHHBlqhCmqChCl
RGQVdVVLnLsQnQnnqWBlBmDRBDWWlhBD
SftLzQndGfVgFfjvvM
npvLlFLTWWqdLnJCmBmmpjQjjmjB
tfgDwzwVVVVtgtrsJtrbjSPQjQmjNBCNBNhPHDHC
ggVzVtMRgzMrvJLqFnnRnnRT
gZFZssWgNZTDwHDWzsFwWDQMMpqqpBPMjFtMPSQFqqqM
vrmvhdnVvQpftStnMN
JCdLddhhdJdcCdrrmCGhlgNsWDWDwWsgwHgHLZHW
vSsSGjSPvjvRSGpFprFbqFpppRfp
ZdmlndtBZbwrwfpWFn
JmdHdBBHtgllZldBhJZldLLBjPVQTfvGPNzQQSjjzPgTGNTs
TjTjBjVrTsLRRrMBsMMgzLqGGqgQHQdCQGgpgd
nbZcmNnPNcbNftvhlhZpgQgCqdSpgCHCqPFzSH
WfcNvtmmNmQlvNcbsWWjMwMVMRDVMDJM
hHHnfZSwHDgHcfclSGSnvrnvBCvWWntvzvzbWWVq
dTJTmspFTsFdRRLvtvLzvvVqtPVtrb
VFMNFpRJNTppTpsJVRcMGgfGfgZwghgGfcGh
lLGvwsMJLCMVnTrCrVdHRd
tbzqtDNNBpNWBtqzfRrFFnrVTTdrQVSVGp
tztfzmfzzPDzgWNNBbhGMlJLsvhJJjGJhGmM
rHrVJQVQVJLggDQQLbTvdCCSTdWLLLbCbS
pNtnwPthmZGRpmPFtqbMSzqffFSdTvbSzW
GpvvshwtmwsZDljjssHjVBVj
SmhJdtJhhzQSrzVhtQbtBRNfnFNSnDNGRfFGGMgR
lHwqPjqwTjLHCWLvPpvNrNMvnNGNfNGNBffGRN
lCrPTrwpPZWlqPlqpWWqZjsmJzbzVtVhhdsJcQdddZVJ
QqpCWHdQdVQlWcQCqcfRjnZZZPDnSPqPhhqZ
tmmzgWGgwJwwStSZZDRnZssR
GbFbLLvgmMMwGgmLCrppQrWVlWrFTHHd
qdqCgSVdVSVqfwsdZhpJspZsph
RjZBbmRlrlmmJwLNNNhLpwhB
vZlRrtTZCzCMfSPT
JBjhCNwjrlJlHJJRsscZrTcvLLgTsLPP
dDztmntCSgbLgqTzgc
fGVWnSMFtVGMNNNQllBjWHJC
dSDhVVdVZtnSgHQGThQvFNQQqF
LcfLRpMpcBpbrJfsbsscBNWRNPRGHvqPdTGPGqPWFH
spmrCcrdJJpLLmcmLLLDlzSzCCjVwZVtgnSZzn
ZJtgPTHtZPZQGbtNzzprVWWVrbrpCD
BRlfcRmBhSMVBqSVfBvNWrDrjWCjjzprCDCl
LfMRSmfqfSLcnnMqVSfccnhZwJFHZFTGZQGFLggwZTZGPJ
BChWddRRRcfmDbfhDP
MgpMFFsvMfGwvLgPjQPzPPmDcztDtw
NFgJpqvpLgqFnWWVNSfnNSCR
zMMMRmMfJpfhpzQJLMVtjtjPntgBtlZlVgJP
SdNbZvZbvbHTNbZbSWTdrTVBglBDlWBjDPDgntPqBDPt
rrNcrFwNdSrfzwMzZMLQQs
JPmCSfHTGJdTCbHgpgqLgRhghhffhg
ZWSSFVSVFQghQvwpphgh
lsDtZjVMMSdCNdbGCbjb
PBQPvDvVVRvQDqLDzJTlzwjz
tGcZTcdgGcncdrFrsTjzJSJqJqqwHSzzSZwq
CgtgdFgcFCMnMgsGFGGQWPQpQTCBvbNpNVVWVT
FHVFWMHMgVhnLWWMpnppfcdZNcPplnfn
RSvSCBSqGgDRjqCpPlPpppTpPjlcNP
zRzsGgJDqJwLVWVFwM
ThhWhNthVWTWqbWbFWbTdBtWSdMlHSlGlCGCdsCMClmnSlMn
DPPpvvfDHfLgDHvzpvPDsssMsmmzsMcClScMMcGG
rgPLHHJJHgZfvvZQQZfrpfFqBBwFBTNTBNBwtthQwVqt
JJgSWDSmSDQCFrhbRLSwLS
VznqzVNsMsZLdqslbRChtbHdHRrwHb
LVfNLMsLTmWDpBpf
cbTsnNpcnnchllFQlMRgJhRP
WddmdMVSBMWSBWjwCJVCPRwPFCQRRC
DWSSfjdSrTpDnHHMbZ
fgsVqqwQQtHhCrDfJH
pvbnBZWBbvWbTdthrJbDmqrmHq
TvZSNSNNSvFMBpqpnLnTBZBFGQwlQFggcFzcVGRlswsRll
zfMcQHzPtRNvlllc
BLnMhbZMLJLNNVtCdNgZgt
BJGFpqMBhBLLMqnwBhbrbhLssjFzssjfDzsmFmjmQFQPjT
JPBJPnpBFrqBJHtjlCjHJcCthM
wQZggQWQGfZFVmmGfDRjlvvNcvlNDhcNttlctt
SfmWfwVFwVGZWQVGSTdTbBpTPSqBbLnnrn
RJqBRJbqpqqJGvqHMmcfczfcjvHQfm
llgVnSWSlsssTnlWjhTcsZMcZcZMZMcccMNmcH
TnFhhllnWCnVCTllLnhhVSrbDDPrdpjRRqjBPRBBpbFJ
mRwRRNDjNTqwDNjNnNRTsQLcQWpQWZJLlLpQWs
PMFGCSzzgbBVzCGShVQZcgWsQLLftttQtlZZ
SlGVldCGGbBPMhPCVSBrNNdjRqjDrNmDnmrRwN
mqGGqGHnqGBCMrnGCbbbLgTTFFNNghHNTj
SdRfcsDPPcDdRzWPWltSlscwTSbShhgpQhgbFLbTQFjwhN
DPWWZzzztsDDtfzlscsPdcWZnVMNVqqGJnBrVqCrMrVvZnBJ
ZgglFCrrrlrWCJswHmwRVmFSwSsP
zhzqBLcjjnpzMzjhTtcqnVGbwssVRmqbHNPbwPsVNH
ftBjzLtptRWdvZlQQZQf
nGpsMncVRMGSnfsBllZdppwrTljZrQ
gcgHmtbCthHWhwBFBWZBlWlWrd
bCDDqHhcqbbtqcqtvJMzsGRsvVfPsfnzJV
TclPvSGZsPZRjhjWDgjp
JtnwHFtJqtwfQfgWgRWhdhjtgdRM
JBwnHwgFFqVJrsGmPvNTPsVvSN
ZJnfZNnDNZJLzNntDtDNNzNWTVBPrrvRRGdBcVRfPPcvfdMr
CFgjFmggQSQQmSggVMMvRdTvBVRjrdrc
mbsqQFqFgwwmgmSbwQWWLDWzpLcLnzZzLbLL
PnwSFSLSTwbbHdtstW
RrDZVVfJNZCmDCfVDVlblZHbddtHScbWbMjt
NmzqhzCCqmzffhCCqrhhLLnPvpnTPPgpGTTBSL
ShhfLSDDFMPQddpMrDgNbjzffqqqzgcjbqZR
sCstmwJwVBtmTltVmTVbRbcbcRvqvrZvBRvZbR
VwCnwnVrrrWShWPHHDdQFL
pbpDpWjZMmFCmmmb
jTjtJLJgJncCFmnJFC
LvhvhTQhBSdRNtLNsSszlGrHSGjZDlGf
JrhvTNJJhhCrtVtcrNLwDBSBwqzDwQVbBLQS
RnCgHmHHGMdPsGMfDlDqlSQbQnQQDbzD
RdPMPsmWHmjfMffPcCWrptcprpFTFrFp
`;
const list = parseInput(input);
console.log(rucksackReorganization(list));
console.log(stickerAuthentication(list));
// console.log(priority('A')); //27
// console.log(priority('p')); //16
// console.log(priority('L')); //38
// console.log(priority('v')); //22
// console.log(priority('s')); //19