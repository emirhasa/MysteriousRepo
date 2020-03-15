
public class Queue {
	
	Node head; //we'll use a structure like single circular linked list technically we don't need it circular but it's ok
	Node tail;
	int size;
	
	Queue() {
		size = 0;
	}
	
	public boolean IsEmpty() {
		return size == 0;
	}
	
	public boolean IsFull() {
		//linked list queue is never full - unless we run out of RAM lol
		return false;
	}
	
	public void Enqueue(int data) {
		//put new value in queue
		//2 cases: when it's empty and when it's not
		Node newNode = new Node();
		newNode.data = data;
		if(IsEmpty()) {
			newNode.next = newNode;
			head = newNode;
			tail = newNode;
			size++;
			return;
		} 
		newNode.next = head;
		tail.next = newNode;
		head = newNode;
		size++;
		return;
	}
	
	public int DeQueue() throws Exception {
		//let's try some exceptions this time. can't use a function which can throw
		//an exception unless you put it in a try catch block - at least the way I'm using Java right now. 
		//we return the value of the node we're dequeuing.
		if(IsEmpty()) {
			throw new Exception("Exception: Queue is empty!");
		} else {
			int tempValue;
			if(size == 1) {
				tempValue = head.data;
				head = null;
				tail = null;
				return tempValue;
			} 
			Node tempNode = head;
			//if size >= 1, we move for size - 2 places and do our thing like in a LL
			for(int i = 0; i < (size - 2);i++) {
				tempNode = tempNode.next;
			}
			//we're now at the required place
			tempValue = tempNode.next.data;
			tempNode.next = head;
			tail = tempNode;
			return tempValue;
		}
	}
	
	public int Peek() throws Exception {
		//return tail's value, pretty simple.
		if(!IsEmpty()) {
			return tail.data;
		} else throw new Exception("Exception: Queue is empty!");
	}
	
	public void Delete() {
		//delete all
		size = 0;
		head = null;
		tail = null;
		//if nodes were there, they're up for garbage collection.
	}
	
	public static void main(String[] args) {
		Queue myQueue = new Queue();
		try {
			myQueue.DeQueue();
		}
		catch(Exception ex) {
			System.out.println(ex.getMessage());
		}
		myQueue.Enqueue(5);
		myQueue.Enqueue(3);
		myQueue.Enqueue(0);
		myQueue.Enqueue(15);
		try {
			System.out.println("Peeking" + myQueue.Peek());
			System.out.println("Dequeuing" + myQueue.DeQueue());
			System.out.println("Dequeuing: " + myQueue.DeQueue());
			System.out.println("Peeking" + myQueue.Peek());
		}
		catch(Exception ex) {
			System.out.println(ex.getMessage());
		}
		
	}
	
}
