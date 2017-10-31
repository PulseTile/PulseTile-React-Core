export const checkIsValidateForm = (formState) => {
  for (const key in formState.syncErrors) {
    if (formState.syncErrors[key]) {
      return false;
    }
  }
  return true;
};
