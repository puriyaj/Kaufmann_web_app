export const sizes = (isSquare: boolean) => ({
  xs: `${isSquare ? 'px-2' : 'px-3'} py-2 text-xs font-medium text-center`,
  sm: `${isSquare ? 'px-2' : 'px-3'} py-2 text-sm font-medium text-center`,
  md: `${isSquare ? 'px-2' : 'px-5'} py-2 text-base font-medium text-center`,
  lg: `${isSquare ? 'px-1' : 'px-5'} py-1 text-base font-medium text-center`,
  xl: `${isSquare ? 'px-1' : 'px-5'} py-1 text-base font-medium text-center`,
});

export const iconSizes = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
  xl: 'w-8 h-8',
};

export const colors = {
  raw: 'hover:bg-blue-100 bg-opacity-10',
  primary: 'border border-indigo-500 bg-blue-500 focus:bg-blue-600 focus:ring ring-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-200',
  secondary: 'border border-blue-100 bg-blue-100 hover:bg-blue-200 text-blue-700 disabled:bg-gray-200',
  success: 'border border-green-700 bg-green-700 focus:bg-green-600 focus:ring ring-green-600 hover:bg-inherit text-white hover:text-green-700 disabled:bg-gray-200',
  'outline-primary': 'border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-700 hover:text-white',
  'outline-secondary': 'border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-700 hover:text-white',
  'outline-success': 'border border-green-700 bg-transparent text-green-700 hover:bg-green-700 hover:text-white',
};
