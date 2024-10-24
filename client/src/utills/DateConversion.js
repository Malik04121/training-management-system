function convertDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  return date.toLocaleDateString('en-GB', options);
}

export default convertDate;
