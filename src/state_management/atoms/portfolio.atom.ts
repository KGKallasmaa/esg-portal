import Portfolio from '../../models/portfolio'
import { atom } from 'jotai'

export const portfolioTimeHorizonAtom = atom<Portfolio.TimeHorizon>('all')
export const stocksTimeHorizonAtom = atom<Portfolio.TimeHorizon>('all')
export const accountsTimeHorizonAtom = atom<Portfolio.TimeHorizon>('month')
