package track;
import java.util.ArrayList;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        // Scanner scnaer=new Scanner(new InputStreamReader(System.in));
        // String input = getStdin();
        String[] lines = getStdin();
        StringBuilder stringBuilder=new StringBuilder("");
        for (int i = 0, l = lines.length; i < l; i++) {
            String input = String.format(lines[i]);
            stringBuilder.append(input);

            //System.out.println(output);
        }
        //System.out.println("Enter the input:");

        // if(input.length()>1000000){
        //     System.out.println("input string exceeds max length of 1000000");

        try {
            Integer.parseInt(stringBuilder.toString());
            String longest=longestPalindrome(stringBuilder.toString());
            System.out.println(longest);
        }catch(Exception e){
            System.out.println("The entered text is not an number!.");
        }

    }
    private static String[] getStdin() {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> lines = new ArrayList<>();

            lines.add(scanner.nextLine());

        return lines.toArray(new String[lines.size()]);
    }
    static public String intermediatePalindrome(String s, int start, int end) {
        if (start > end) return null;
        while (start >= 0 && end < s.length()
                && s.charAt(start) == s.charAt(end)) {
            start--;
            end++;
        }
        return s.substring(start + 1, end);
    }
    public static String longestPalindrome(String s) {
        if (s == null) return null;
        String longest = s.substring(0, 1);
        for (int i = 0; i < s.length() - 1; i++) {
            String palindrome = intermediatePalindrome(s, i, i);
            if (palindrome.length() > longest.length()) {
                longest = palindrome;
            }
            palindrome = intermediatePalindrome(s, i, i + 1);
            if (palindrome.length() > longest.length()) {
                longest = palindrome;
            }
        }
        return longest;
    }



}
