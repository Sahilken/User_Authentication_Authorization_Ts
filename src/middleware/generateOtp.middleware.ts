export function ranOTP(): string {
   const intOtp = Math.floor(Math.random() * 9000) + 1000;
   const stringOtp = intOtp.toString();
   return stringOtp;
}

// export const ranOTP = ranOtp();
