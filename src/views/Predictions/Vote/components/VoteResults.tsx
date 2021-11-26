import React, { useEffect, useState } from 'react'
import {
  Box,
  Text,
  Flex,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Progress,
  Skeleton,
  Radio,
  Tag,
  CheckmarkCircleIcon,
  useModal,
  Modal,
  Button,
} from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import { usePredictionsContract } from 'hooks/useContract'
import times from 'lodash/times'
import { formatNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import { Target } from 'react-feather'
import TextEllipsis from './TextEllipsis'

interface Vote {
  id: string
  voter: string
  proposal: string
}

interface VotesProps {
  votes: Vote[]
}

interface State {
  label: string
  address: any
}

export interface ModalProps {
  title: string
  hideCloseButton?: boolean
  onBack?: () => void
  bodyPadding?: string
  headerBackground?: string
  minWidth?: string
  onDismiss?: () => void
}

const Results: React.FC<VotesProps> = ({ votes }) => {
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [isTxPending, setIsTxPending] = useState(false)
  // const results = calculateVoteResults(votes)
  const [myVote, setMyVote] = useState<State>({ label: '', address: '' })
  const [voteResults, setVoteResults] = useState({})
  const [totalVotes, setTotalVotes] = useState(1)
  const [currentRound, setCurrentRound] = useState()

  const predictionsContract = usePredictionsContract()
  const { account } = useWeb3React()

  const ReactiveModal: React.FC<ModalProps & { vote: State }> = ({ title, vote, onDismiss }) => {
    return (
      <Modal title={title} onDismiss={onDismiss}>
        <Box mb="24px" width="320px">
          <Text color="secondary" mb="8px" textTransform="uppercase" fontSize="12px" bold>
            {t('Voting For')}
          </Text>
          <TextEllipsis bold fontSize="20px" mb="8px" title={myVote.label}>
            {myVote.label}
          </TextEllipsis>
          <TextEllipsis bold fontSize="14px" mb="8px">
            {myVote.address}
          </TextEllipsis>
          <Text as="p" color="textSubtle" fontSize="14px">
            {t('Are you sure you want to vote for the above Chainlink Pricefeed Oracle? This action cannot be undone.')}
          </Text>
          <Button width="100%" mb="8px" onClick={handleVote}>
            {t('Confirm Vote')}
          </Button>
          <Button variant="secondary" width="100%" onClick={handleDismiss}>
            {t('Cancel')}
          </Button>
        </Box>
      </Modal>
    )
  }

  const choices = [
    { label: 'FAKE / USD', address: '0xB8ce593E3C94Ad25Bc87D7e3e484C98A4A82335E' },
    { label: 'DAI / USD', address: '0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046' },
    { label: 'ETH / USD', address: '0x0715A7794a1dc8e42615F059dD6e406A6594651A' },
    { label: 'LINK / MATIC', address: '0x12162c3E810393dEC01362aBf156D7ecf6159528' },
    { label: 'MATIC / USD', address: '0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada' },
  ]

  useEffect(() => {
    async function fetchData() {
      if (predictionsContract) {
        try {
          const no = await predictionsContract.currentOracleVoteRound()
          const roundNo = no.toString()
          setCurrentRound(roundNo)
          try {
            const api = await fetch(
              `https://eiwr4ydh0o1u.usemoralis.com:2053/server/functions/oracleTotalVotes?_ApplicationId=kER2QPwy25iYZJVH3AIFiBOsuJl5UNPFSjPc8hKp&round=${roundNo}`,
            )
            const data = await api.json()
            const results = {}
            let count = 0
            for (let i = 0; i < data.result.length; i++) {
              results[data.result[i].objectId.toString()] = data.result[i].count
              count += data.result[i].count
            }
            setVoteResults(results)
            setTotalVotes(count)
          } catch (err) {
            console.log(err)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchData()
  }, [predictionsContract, currentRound])

  /*
const choices = [
  {label:"1INCH / USD", address:"0x443C5116CdF663Eb387e72C688D276e702135C87"},
  {label:"AAVE / USD", address:"0x72484B12719E23115761D5DA1646945632979bB6"},
  {label:"ADA / USD", address:"0x882554df528115a743c4537828DA8D5B58e52544"},
  {label:"AED / USD", address:"0x3fd911749Fce21a38704B76FFaBcB6BeF2567F2E"},
  {label:"ALGO / USD", address:"0x03Bc6D9EFed65708D35fDaEfb25E87631a0a3437"},
  {label:"AUD / USD", address:"0x062Df9C4efd2030e243ffCc398b652e8b8F95C6f"},
  {label:"BAT / USD", address:"0x2346Ce62bd732c62618944E51cbFa09D985d86D2"},
  {label:"BCH / USD", address:"0x327d9822e9932996f55b39F557AEC838313da8b7"},
  {label:"BHD / USD", address:"0xC5c770ae2efDF0DBC2FB366fb3833dAc2A20BF2F"},
  {label:"BNB / USD", address:"0x82a6c4AF830caa6c97bb504425f6A66165C2c26e"},
  {label:"BNT / USD", address:"0xF5724884b6E99257cC003375e6b844bC776183f9"},
  {label:"BSV / USD", address:"0x8803DD6705F0d38e79790B02A2C43594A0538D22"},
  {label:"BTC / USD", address:"0xc907E116054Ad103354f2D350FD2514433D57F6f"},
  {label:"BTG / USD", address:"0x2f2C605F28DE314bc579a7c0FDf85536529E9825"},
  {label:"BUSD / USD", address:"0xE0dC07D5ED74741CeeDA61284eE56a2A0f7A4Cc9"},
  {label:"CAD / USD", address:"0xACA44ABb8B04D07D883202F99FA5E3c53ed57Fb5"},
  {label:"CEL / USD", address:"0xc9ECF45956f576681bDc01F79602A79bC2667B0c"},
  {label:"COMP / USD", address:"0x2A8758b7257102461BC958279054e372C2b1bDE6"},
  {label:"DAI / USD", address:"0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D"},
  {label:"DASH / USD", address:"0xD94427eDee70E4991b4b8DdCc848f2B58ED01C0b"},
  {label:"DOGE / USD", address:"0xbaf9327b6564454F4a3364C33eFeEf032b4b4444"},
  {label:"DOT / USD", address:"0xacb51F1a83922632ca02B25a8164c10748001BdE"},
  {label:"EOS / USD", address:"0xd6285F06203D938ab713Fa6A315e7d23247DDE95"},
  {label:"ETC / USD", address:"0xDf3f72Be10d194b58B1BB56f2c4183e661cB2114"},
  {label:"ETH / USD", address:"0xF9680D99D6C9589e2a93a78A04A279e509205945"},
  {label:"EUR / USD", address:"0x73366Fe0AA0Ded304479862808e02506FE556a98"},
  {label:"GBP / USD", address:"0x099a2540848573e94fb1Ca0Fa420b00acbBc845a"},
  {label:"HKD / USD", address:"0x82d43B72573f902F960126a19581BcBbA5b014F5"},
  {label:"HT / USD", address:"0x6F8F9e75C0285AecE30ADFe1BCc1955f145d971A"},
  {label:"ICP / USD", address:"0x84227A76a04289473057BEF706646199D7C58c34"},
  {label:"KNC / USD", address:"0x10e5f3DFc81B3e5Ef4e648C4454D04e79E1E41E2"},
  {label:"KWD / USD", address:"0x90711d545915f8e99a22BB1F86eb8C0403e3358F"},
  {label:"LINK / USD", address:"0xd9FFdb71EbE7496cC440152d43986Aae0AB76665"},
  {label:"LPT / USD", address:"0xBAaF11CeDA1d1Ca9Cf01748F8196653c9656a400"},
  {label:"LTC / USD", address:"0xEB99F173cf7d9a6dC4D889C2Ad7103e8383b6Efa"},
  {label:"MANA / USD", address:"0xA1CbF3Fe43BC3501e3Fc4b573e822c70e76A7512"},
  {label:"MATIC / USD", address:"0xAB594600376Ec9fD91F8e885dADF0CE036862dE0"},
  {label:"MIOTA / USD", address:"0x7d620D05c317A426903596432A5ca83375dC8d2A"},
  {label:"MKR / USD", address:"0xa070427bF5bA5709f70e98b94Cb2F435a242C46C"},
  {label:"NEO / USD", address:"0x74b3587A23eE786A43C8529c2e98D3C05a8fb1fB"},
  {label:"OMG / USD", address:"0x93FfEE768F74208a7b9f2a4426f0F6BCbb1D09de"},
  {label:"OMR / USD", address:"0x0E12b79A6E5c919F89246edEdb2d6413a8890a54"},
  {label:"PAX / USD", address:"0x56D55D34EcC616e71ae998aCcba79F236ff2ff46"},
  {label:"PAXG / USD", address:"0x0f6914d8e7e1214CDb3A4C6fbf729b75C69DF608"},
  {label:"SAR / USD", address:"0x5047CdCf17AA5a0bb77217497142657B27a1e228"},
  {label:"SNX / USD", address:"0xbF90A5D9B6EE9019028dbFc2a9E50056d5252894"},
  {label:"SOL / USD", address:"0x10C8264C0935b3B9870013e057f330Ff3e9C56dC"},
  {label:"THETA / USD", address:"0x38611b09F8f2D520c14eA973765C225Bf57B9Eac"},
  {label:"TRX / USD", address:"0x307cCF7cBD17b69A487b9C3dbe483931Cf3E1833"},
  {label:"TUSD / USD", address:"0x7C5D415B64312D38c56B54358449d0a4058339d2"},
  {label:"UMA / USD", address:"0x33D9B1BAaDcF4b26ab6F8E83e9cb8a611B2B3956"},
  {label:"UNI / USD", address:"0xdf0Fb4e4F928d2dCB76f438575fDD8682386e13C"},
  {label:"USDC / USD", address:"0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7"},
  {label:"USDT / USD", address:"0x0A6513e40db6EB1b165753AD52E80663aeA50545"},
  {label:"VET / USD", address:"0xD78bc11ef3256e3CE9dC0DF0fa7be9E9afc07f95"},
  {label:"XAU / USD", address:"0x0C466540B2ee1a31b441671eac0ca886e051E410"},
  {label:"XLM / USD", address:"0x692AE5510cA9070095A496dbcFBCDA99D4024Cd9"},
  {label:"XMR / USD", address:"0xBE6FB0AB6302B693368D0E9001fAF77ecc6571db"},
  {label:"XRP / USD", address:"0x785ba89291f676b5386652eB12b30cF361020694"},
  {label:"XTZ / USD", address:"0x691e26AB58ff05800E028b0876A41B720b26FC65"},
  {label:"YFI / USD", address:"0x9d3A43c111E7b2C6601705D9fcF7a70c95b1dc55"},
  {label:"ZEC / USD", address:"0xBC08c639e579a391C4228F20d0C29d0690092DF0"},
  {label:"ZRX / USD", address:"0x6EA4d89474d9410939d429B786208c74853A5B47"}
]

*/

  const hasVoted = votes.some((vote) => {
    return account && vote.voter.toLowerCase() === account.toLowerCase()
  })

  const handleSuccess = async () => {
    toastSuccess(t('Vote cast!'))
    const no = await predictionsContract.currentOracleVoteRound()
    setCurrentRound(no.toString())
  }

  const handleBack = async () => {
    console.log('gandleback')
  }
  const onConfirm = async () => {
    toastSuccess(t('Vote cast! index'))
    onDismiss()
    // dispatch(fetchVotes({ proposalId: proposal.id, block: Number(proposal.snapshot) }))
  }

  const handleDismiss = async () => {
    onDismiss()
  }

  const handleVote = async () => {
    console.log(myVote)
    try {
      const oracleAddress = myVote.address.toString()
      const tx = await predictionsContract.voteForNewOracle(oracleAddress)
      //  const tx = await callWithGasPrice(predictionsContract, 'voteForNewOracle', oracleAddress)

      setIsTxPending(true)
      toastSuccess(t('Vote cast!'))
      onDismiss()
    } catch (err) {
      console.log(err)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setIsTxPending(false)
    }
  }

  const [presentCastVoteModal, onDismiss] = useModal(
    <ReactiveModal title="Vote for Oracle" onDismiss={handleDismiss} vote={myVote} />,
    true,
    true,
  )

  return (
    <Card style={{ width: '60%' }} ml="10px" mr="10px">
      <CardHeader>
        <Heading as="h3" scale="md">
          Round {currentRound} Results
        </Heading>
      </CardHeader>
      <CardBody>
        {choices.map((choice, index) => {
          let totalChoiceVote = 0
          if (voteResults[choice.address.toLowerCase()]) totalChoiceVote = voteResults[choice.address.toLowerCase()]
          const progress = (totalChoiceVote / totalVotes) * 100
          const hasVotedThisChoice = votes.some((v) => {
            return (
              account &&
              v.voter.toLowerCase() === account.toLowerCase() &&
              choice.address.toLowerCase() === v.proposal.toLowerCase()
            )
          })
          const handleChange = () => {
            setMyVote({
              label: choice.label,
              address: choice.address,
            })
            presentCastVoteModal()
          }

          return (
            <Box key={choice.label} mt={index > 0 ? '24px' : '0px'}>
              <Flex alignItems="center" mb="8px">
                {!hasVoted && (
                  <div style={{ flexShrink: 0 }}>
                    <Radio
                      scale="sm"
                      value={index}
                      checked={hasVotedThisChoice}
                      onChange={handleChange}
                      disabled={!account}
                    />
                  </div>
                )}
                <TextEllipsis ml="4px" mb="4px" title={choice.label}>
                  {choice.label}
                </TextEllipsis>
                {hasVotedThisChoice && (
                  <Tag variant="success" outline ml="8px">
                    <CheckmarkCircleIcon mr="4px" /> {t('Voted')}
                  </Tag>
                )}
              </Flex>
              <Box mb="4px">
                <Progress primaryStep={progress} scale="sm" />
              </Box>
              <Flex alignItems="center" justifyContent="space-between">
                <Text color="textSubtle">{t('%total% Votes', { total: totalChoiceVote })}</Text>
                <Text>
                  {progress.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                </Text>
              </Flex>
            </Box>
          )
        })}
      </CardBody>
    </Card>
  )
}

export default Results
