public class MyArray {

    //declare
    int[] arr;

    public MyArray() {

        //instantiate
        arr = new int[5];

        //initialize
        arr[0]= 10;
        arr[1] = 20;
        arr[2] = 30;
        arr[3] = 10000;
        arr[4] = 1656;

    }

    public void TraverseArray() {
        long startTime = System.nanoTime();
        for (int i = 0 ; i < arr.length; i ++ ) {
            System.out.println(arr[i]);
        }
        long endTime = System.nanoTime();
        System.out.println("Execution(ms): " + (float)(endTime - startTime)/1000000);
    }

    public int SearchArray(int searchValue) {
        for(int i = 0; i < arr.length; i++) {
            if( arr[i]== searchValue) {
                System.out.println("Found: " + searchValue + " at index: " + i);
                return searchValue;
            }
        }
        System.out.println("Value not found");
        return Integer.MIN_VALUE;
    }

    public boolean ArrayInsert(int value, int location) {
        try {
            if(arr[location] != 0) {
                System.out.println("Location already has value");
                return false;
            } else {
                arr[location] = value;
                System.out.println("Success inserting " + value + " at index: " + location);
                return true;
            }
        }
        catch(Exception ex) {
            System.out.println(ex.getMessage());
            return false;
        }
    }

    public boolean ArrayDelete(int location) {
        try {
            if(arr[location] != 0) {
                System.out.println("Success deleting " + arr[location] + " at index: " + location);
                arr[location] = 0;
                return true;
            } else {
                System.out.println("Field already blank");
                return false;
            }
        }
        catch(Exception ex) {
            System.out.println(ex.getMessage());
            return false;
        }
    }

    public static void main(String[] args)  {
        System.out.println("_______________________________________");
        MyArray array = new MyArray();
        array.TraverseArray();
        array.TraverseArray();
    }

}

