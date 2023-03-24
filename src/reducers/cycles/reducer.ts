import { ActionType } from "./actions";
import { produce} from 'immer'

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CycleState {
  cycles: Cycle[];
  activeCycleId: string | null;
}



export function cyclesReducer(state: CycleState, action: any) {
  if (action.type === ActionType.ADD_NEW_CYCLE) {
    return produce(state, draft => {
      draft.cycles.push(action.payload.newCycle)
      draft.activeCycleId = action.payload.newCycle.id
    })

  }

  if (action.type === ActionType.INTERRUPT_CURRENT_CYCLE) {
    const currentCycleIndex = state.cycles.findIndex(cycle =>{
      return cycle.id === state.activeCycleId
    })

    if (currentCycleIndex < 0) {
      return state
    }

    return produce(state, draft => {
      draft.activeCycleId = null
      draft.cycles[currentCycleIndex].interruptedDate = new Date()
    })
  }

  if (action.type === ActionType.MARK_CURRENT_CYCLE_AS_FINISHED) {
    const currentCycleIndex = state.cycles.findIndex(cycle =>{
      return cycle.id === state.activeCycleId
    })

    if (currentCycleIndex < 0) {
      return state
    }

    return produce(state, draft => {
      draft.activeCycleId = null
      draft.cycles[currentCycleIndex].finishedDate = new Date()
    })
  }

  if (action.type === ActionType.ACTIVE_CYCLE_ID_RESET) {
    return produce(state, draft => {
      draft.activeCycleId = null
    })
  }
  return state;
}
