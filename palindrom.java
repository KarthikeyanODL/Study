package track;
import java.util.ArrayList;
import java.util.Scanner;

public class App {

    private static String[] getStdin() {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> numbers = new ArrayList<>();
        numbers.add(scanner.nextLine());
        return numbers.toArray(new String[numbers.size()]);
    }

    public static String findPalindrome(String numberString, int start, int end) {
        if (start > end) {
            return null;
        }
        while (start >= 0 && end < numberString.length()
                && numberString.charAt(start) == numberString.charAt(end)) {
            start--;
            end++;
        }
        return numberString.substring(start + 1, end);
    }

    public static String searchPalindrome(String numberString) {
        if (numberString == null) {
            return null;
        }
        String longestPalindrome = numberString.substring(0, 1);
        for (int itr = 0; itr < numberString.length() - 1; itr++) {
            String palindrome = findPalindrome(numberString, itr, itr);
            if (palindrome.length() > longestPalindrome.length()) {
                longestPalindrome = palindrome;
            }
            palindrome = findPalindrome(numberString, itr, itr + 1);
            if (palindrome.length() > longestPalindrome.length()) {
                longestPalindrome = palindrome;
            }
        }
        return longestPalindrome;
    }

    public static void main(String[] args) {
        StringBuilder palindromeBuilder=new StringBuilder("");
        String[] number = getStdin();
       
        for (int itr = 0, length = number.length; itr < length; itr++) {
            String input = String.format(number[itr]);
            palindromeBuilder.append(input);
        }

        try {
            Integer.parseInt(palindromeBuilder.toString());
            String longestPalindrome=searchPalindrome(palindromeBuilder.toString());
            System.out.println(longestPalindrome);
        }catch(Exception e){
            System.out.println("The entered text is not an number!.");
        }
    }
}
