import java.util.Random;


public class My2DArray {

    int[][] arr;
    int RandomFactor;
    int RandomFactor2;

    public My2DArray() {

        arr = new int[5][4];
        Random rand = new Random();

        RandomFactor = rand.nextInt(15);
        RandomFactor += 1;

        RandomFactor2 = rand.nextInt(15);
        RandomFactor2 += 1;

        for(int i= 0; i < 5; i ++) {
            for( int j = 0; j < 4; j ++ ) {
                arr[i][j] = (RandomFactor * RandomFactor2) + (i*j);
            }
        }

    }

    public void TraverseArray() {
        long startTime = System.nanoTime();
        int counter = 0;
        for(int i = 0; i < 5; i ++ ) {
            for( int j = 0; j < 4; j ++ ) {
               System.out.println(counter++);

            }
        }
        long endTime = System.nanoTime();

        System.out.println("Vrijeme izvršenja(ms): " + (float)(endTime - startTime) / 1000000);
    }

    public void TraverseArray2() {

        long startTime = System.nanoTime();
        int counter = 0;
        for(int i = 0; i < arr.length * arr[0].length; i ++) {
            System.out.println(counter++);
        }
        long endTime = System.nanoTime();

        System.out.println("Vrijeme izvršenja(ms): " + (float)(endTime - startTime) / 1000000);
    }

    public static void main(String[] args) {

        My2DArray niz = new My2DArray();

        niz.TraverseArray();
        niz.TraverseArray2();

    }
}