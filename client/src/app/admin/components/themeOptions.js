const getTheme = () => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme ? storedTheme : 'dark';
    }
    return 'dark';
  };
  
  export default getTheme;
  