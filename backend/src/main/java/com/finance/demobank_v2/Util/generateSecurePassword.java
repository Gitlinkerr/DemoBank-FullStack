package com.finance.demobank_v2.Util;

import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;

public class generateSecurePassword {
    public static String generateSecurePassword() {

        // create character rule for lower case
        CharacterRule LCR = new CharacterRule(EnglishCharacterData.LowerCase);
        // set number of lower case characters
        LCR.setNumberOfCharacters(2);

        // create character rule for upper case
        CharacterRule UCR = new CharacterRule(EnglishCharacterData.UpperCase);
        // set number of upper case characters
        UCR.setNumberOfCharacters(4);

        // create character rule for digit
        CharacterRule DR = new CharacterRule(EnglishCharacterData.Digit);
        // set number of digits
        DR.setNumberOfCharacters(2);



        // create instance of the PasswordGenerator class
        PasswordGenerator passGen = new PasswordGenerator();

        // call generatePassword() method of PasswordGenerator class to get Passay generated password

        // return Passay generated password to the main() method
        return passGen.generatePassword(8, LCR, UCR, DR);
    }

}