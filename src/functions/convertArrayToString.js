function convertArrayToString(arr) {
    if (!!arr) {
      return arr.map(item => {
        const index = item.indexOf('/');
        if (index !== -1) {
          const type = item.slice(index + 1);
          if (type === 'svg+xml') {
            return 'svg';
          }
          return type;
        }
        return item;
      }).join(', ');
    }
  }

  export default convertArrayToString;

