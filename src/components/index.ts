/*

This file is in the parent folder(components) and exports all the components as a named export from here.
Now in any of the files you want to access any component,
you can easily import it using the named import in a single line from "./components" address.

*/

export { default as LoginForm } from "./LoginForm/LoginForm";
export { default as SignupForm } from "./SignupForm/SignupForm";
export { default as UsernameInput } from "./UsernameInput/UsernameInput";
export { default as PasswordInput } from "./PasswordInput/PasswordInput";
export { default as EmailInput } from "./EmailInput/EmailInput";
export { default as CheckboxInput } from "./CheckboxInput/CheckboxInput";
export { default as SubmitButton } from "./SubmitButton/SubmitButton";
export { default as SocialButton } from "./SocialButton/SocialButton";