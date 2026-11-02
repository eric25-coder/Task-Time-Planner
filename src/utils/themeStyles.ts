import { ThemeType } from '../types';

export interface ThemeConfig {
  name: string;
  bg: string;
  cards: string;
  innerCards: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  border: string;
  gradient: string;
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  blossom: {
    name: 'Blossom',
    bg: '#FFF0F5',
    cards: '#F8DCE9',
    innerCards: '#FFF6FA',
    primary: '#E88BB5',
    secondary: '#C8B5E8',
    accent: '#D85F96',
    text: '#29232B',
    border: '#EFBBD1',
    gradient: 'linear-gradient(135deg, #FFF0F5 0%, #F8DCE9 50%, #FFF6FA 100%)'
  },
  sky: {
    name: 'Sky',
    bg: '#F1F7FF',
    cards: '#DCEBFA',
    innerCards: '#F5F9FF',
    primary: '#79AFE0',
    secondary: '#B9B0E8',
    accent: '#477DB8',
    text: '#24344A',
    border: '#BBD5F0',
    gradient: 'linear-gradient(135deg, #F1F7FF 0%, #DCEBFA 50%, #F5F9FF 100%)'
  },
  nature: {
    name: 'Nature',
    bg: '#FFF8ED',
    cards: '#F0E5D5',
    innerCards: '#FAF3E9',
    primary: '#91B7A0',
    secondary: '#D99576',
    accent: '#47765B',
    text: '#39332F',
    border: '#D8C9B5',
    gradient: 'linear-gradient(135deg, #FFF8ED 0%, #F0E5D5 50%, #FAF3E9 100%)'
  },
  peach: {
    name: 'Peach',
    bg: '#FFF5EE',
    cards: '#FFE4E1',
    innerCards: '#FFF0F5',
    primary: '#FFB347',
    secondary: '#FFD1DC',
    accent: '#FF6B6B',
    text: '#4A3A3A',
    border: '#FFDAB9',
    gradient: 'linear-gradient(135deg, #FFF5EE 0%, #FFE4E1 50%, #FFF0F5 100%)'
  },
  mint: {
    name: 'Mint',
    bg: '#E0F7FA',
    cards: '#B2DFDB',
    innerCards: '#E0F2F1',
    primary: '#4DB6AC',
    secondary: '#80CBC4',
    accent: '#26A69A',
    text: '#004D40',
    border: '#B2DFDB',
    gradient: 'linear-gradient(135deg, #E0F7FA 0%, #B2DFDB 50%, #E0F2F1 100%)'
  },
  lavender: {
    name: 'Lavender',
    bg: '#F3E5F5',
    cards: '#E1BEE7',
    innerCards: '#F8BBD0',
    primary: '#9575CD',
    secondary: '#CE93D8',
    accent: '#7E57C2',
    text: '#311B92',
    border: '#D1C4E9',
    gradient: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 50%, #F8BBD0 100%)'
  },
  lemon: {
    name: 'Lemon',
    bg: '#FFFDE7',
    cards: '#FFF9C4',
    innerCards: '#F9FBE7',
    primary: '#FDD835',
    secondary: '#FFF176',
    accent: '#FBC02D',
    text: '#3E2723',
    border: '#FFF59D',
    gradient: 'linear-gradient(135deg, #FFFDE7 0%, #FFF9C4 50%, #F9FBE7 100%)'
  },
  berry: {
    name: 'Berry',
    bg: '#FCE4EC',
    cards: '#F8BBD0',
    innerCards: '#FCE4EC',
    primary: '#D81B60',
    secondary: '#F48FB1',
    accent: '#C2185B',
    text: '#880E4F',
    border: '#F8BBD0',
    gradient: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 50%, #FCE4EC 100%)'
  },
  ocean: {
    name: 'Ocean',
    bg: '#E1F5FE',
    cards: '#B3E5FC',
    innerCards: '#E1F5FE',
    primary: '#039BE5',
    secondary: '#81D4FA',
    accent: '#0288D1',
    text: '#01579B',
    border: '#B3E5FC',
    gradient: 'linear-gradient(135deg, #E1F5FE 0%, #B3E5FC 50%, #E1F5FE 100%)'
  },
  sunset: {
    name: 'Sunset',
    bg: '#FFF3E0',
    cards: '#FFE0B2',
    innerCards: '#FFF8E1',
    primary: '#FF9800',
    secondary: '#FFCC80',
    accent: '#F57C00',
    text: '#BF360C',
    border: '#FFE0B2',
    gradient: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFF8E1 100%)'
  },
  forest: {
    name: 'Forest',
    bg: '#E8F5E9',
    cards: '#C8E6C9',
    innerCards: '#F1F8E9',
    primary: '#4CAF50',
    secondary: '#81C784',
    accent: '#388E3C',
    text: '#1B5E20',
    border: '#C8E6C9',
    gradient: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #F1F8E9 100%)'
  },
  skyline: {
    name: 'Skyline',
    bg: '#ECEFF1',
    cards: '#CFD8DC',
    innerCards: '#ECEFF1',
    primary: '#546E7A',
    secondary: '#90A4AE',
    accent: '#455A64',
    text: '#263238',
    border: '#CFD8DC',
    gradient: 'linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 50%, #ECEFF1 100%)'
  },
  cottoncandy: {
    name: 'Cotton Candy',
    bg: '#FCE4EC',
    cards: '#E1BEE7',
    innerCards: '#F3E5F5',
    primary: '#EC407A',
    secondary: '#CE93D8',
    accent: '#D81B60',
    text: '#880E4F',
    border: '#E1BEE7',
    gradient: 'linear-gradient(135deg, #FCE4EC 0%, #E1BEE7 50%, #F3E5F5 100%)'
  },
  mocha: {
    name: 'Mocha',
    bg: '#EFEBE9',
    cards: '#D7CCC8',
    innerCards: '#EFEBE9',
    primary: '#795548',
    secondary: '#A1887F',
    accent: '#5D4037',
    text: '#3E2723',
    border: '#D7CCC8',
    gradient: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 50%, #EFEBE9 100%)'
  },
  grape: {
    name: 'Grape',
    bg: '#EDE7F6',
    cards: '#D1C4E9',
    innerCards: '#EDE7F6',
    primary: '#673AB7',
    secondary: '#9575CD',
    accent: '#512DA8',
    text: '#311B92',
    border: '#D1C4E9',
    gradient: 'linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 50%, #EDE7F6 100%)'
  },
  sage: {
    name: 'Sage',
    bg: '#E8F5E9',
    cards: '#C8E6C9',
    innerCards: '#E8F5E9',
    primary: '#66BB6A',
    secondary: '#A5D6A7',
    accent: '#4CAF50',
    text: '#1B5E20',
    border: '#C8E6C9',
    gradient: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #E8F5E9 100%)'
  },
  sky_blue: {
    name: 'Sky Blue',
    bg: '#E3F2FD',
    cards: '#BBDEFB',
    innerCards: '#E3F2FD',
    primary: '#2196F3',
    secondary: '#64B5F6',
    accent: '#1976D2',
    text: '#0D47A1',
    border: '#BBDEFB',
    gradient: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #E3F2FD 100%)'
  },
  lilac: {
    name: 'Lilac',
    bg: '#F3E5F5',
    cards: '#E1BEE7',
    innerCards: '#F3E5F5',
    primary: '#9C27B0',
    secondary: '#BA68C8',
    accent: '#7B1FA2',
    text: '#4A148C',
    border: '#E1BEE7',
    gradient: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 50%, #F3E5F5 100%)'
  },
  apricot: {
    name: 'Apricot',
    bg: '#FFF3E0',
    cards: '#FFE0B2',
    innerCards: '#FFF3E0',
    primary: '#FF9800',
    secondary: '#FFB74D',
    accent: '#F57C00',
    text: '#E65100',
    border: '#FFE0B2',
    gradient: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFF3E0 100%)'
  },
  pistachio: {
    name: 'Pistachio',
    bg: '#F1F8E9',
    cards: '#DCEDC8',
    innerCards: '#F1F8E9',
    primary: '#8BC34A',
    secondary: '#AED581',
    accent: '#689F38',
    text: '#33691E',
    border: '#DCEDC8',
    gradient: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 50%, #F1F8E9 100%)'
  },
  rose: {
    name: 'Rose',
    bg: '#FCE4EC',
    cards: '#F8BBD0',
    innerCards: '#FCE4EC',
    primary: '#E91E63',
    secondary: '#F06292',
    accent: '#C2185B',
    text: '#880E4F',
    border: '#F8BBD0',
    gradient: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 50%, #FCE4EC 100%)'
  },
  slate: {
    name: 'Slate',
    bg: '#ECEFF1',
    cards: '#CFD8DC',
    innerCards: '#ECEFF1',
    primary: '#546E7A',
    secondary: '#78909C',
    accent: '#455A64',
    text: '#263238',
    border: '#CFD8DC',
    gradient: 'linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 50%, #ECEFF1 100%)'
  },
  steel: {
    name: 'Steel',
    bg: '#E3F2FD',
    cards: '#B0BEC5',
    innerCards: '#ECEFF1',
    primary: '#455A64',
    secondary: '#78909C',
    accent: '#37474F',
    text: '#263238',
    border: '#B0BEC5',
    gradient: 'linear-gradient(135deg, #E3F2FD 0%, #B0BEC5 50%, #ECEFF1 100%)'
  },
  charcoal_mist: {
    name: 'Charcoal Mist',
    bg: '#F5F5F5',
    cards: '#E0E0E0',
    innerCards: '#F5F5F5',
    primary: '#616161',
    secondary: '#9E9E9E',
    accent: '#424242',
    text: '#212121',
    border: '#E0E0E0',
    gradient: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 50%, #F5F5F5 100%)'
  },
  navy_haze: {
    name: 'Navy Haze',
    bg: '#E8EAF6',
    cards: '#C5CAE9',
    innerCards: '#E8EAF6',
    primary: '#3F51B5',
    secondary: '#5C6BC0',
    accent: '#303F9F',
    text: '#1A237E',
    border: '#C5CAE9',
    gradient: 'linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 50%, #E8EAF6 100%)'
  },
  olive_dust: {
    name: 'Olive Dust',
    bg: '#F1F8E9',
    cards: '#C8E6C9',
    innerCards: '#F1F8E9',
    primary: '#558B2F',
    secondary: '#7CB342',
    accent: '#33691E',
    text: '#1B5E20',
    border: '#C8E6C9',
    gradient: 'linear-gradient(135deg, #F1F8E9 0%, #C8E6C9 50%, #F1F8E9 100%)'
  }
};
