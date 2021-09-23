sig Node {}

sig MState {
	from: Node,											
	to: set Node										
}

abstract sig Msg {
	state: MState,										
	sentOn: TimeSlot,
	readOn: Node -> lone TimeSlot						
}{
	readOn.TimeSlot in state.to
}

sig Msg_Data, Msg_Remote, Msg_Error, Msg_Overload extends Msg {}

sig TimeSlot {
 
	inChannel: Node -> Msg,

	read: Node -> Msg,
	sent: Node -> Msg,
 
	available: set Msg,
.
	needsToSend: Node -> Msg
}

fun MsgsSentOnTimeSlot[t: TimeSlot]: set Msg { t.sent[Node] }
fun MsgsReadOnTimeSlot[t: TimeSlot]: set Msg { t.read[Node] }

fact RulesOfCANBus {

	Msg in TimeSlot.sent[Node]							
	read in inChannel								

	no ord/first.inChannel[Node]					

	all pre: TimeSlot - ord/last | let post = ord/next[pre] | {
	
        post.available = pre.available - MsgsSentOnTimeSlot[pre]
     }

	all t: TimeSlot | {
		MsgsSentOnTimeSlot[t] in t.available

		
		MsgsSentOnTimeSlot[t].sentOn in t
		MsgsReadOnTimeSlot[t].readOn[Node] in t

		
		MsgsSentOnTimeSlot[t] = t.sent[Node]

		all n: Node, m: Msg | m.readOn[n] = t => m in t.read[n]
		
		all n: Node | t.sent[n].state.from in n

	
		all n: Node, m: Msg | {
			
			(m in t.inChannel[n] => (n in m.state.to && m.sentOn in ord/prevs[t]))
		
			(m in t.read[n] => m !in ord/nexts[t].inChannel[n])
		}
	}
}

fact FrameConfiguration {
	all pre: TimeSlot - ord/last | let post = ord/next[pre] | {

		#pre.read.Msg_Overload > 0 => #post.sent.Msg = 0
	
		all n:Node | pre.read[n] in Msg_Remote && post.sent[n] in Msg_Data
	
		all n:Node | pre.read[n] in Msg_Error &&
							post.sent[n] in Msg_Data &&
							post.sent[n].state.to = pre.read[n].state.to
     }
}

fun MsgsLiveOnTimeSlot[t: TimeSlot]: set Msg {
	Msg - { future: Msg | future.sentOn in ord/nexts[t] }
           - { past: Msg | all n: past.state.to | past.readOn[n] in ord/prevs[t] }
}

pred ReadInOrder  {
    

    
	all n1, n2: Node | all m1, m2: Msg | {
		m1.state.from = n1
		m2.state.from = n1
		m1.state.to = n2
		m2.state.to = n2
	} => {
		
		(some m1.readOn[n2] && some m2.readOn[n2] &&
			m1.readOn[n2] in ord/prevs[m2.readOn[n2]]) =>
			ord/lte[m1.sentOn, m2.sentOn]
		}
}

pred NoMessageShortage {
	
	all t: TimeSlot - ord/last | (sum n: Node | # t.needsToSend[n]) =< # t.available
}

pred NumOfState  {
   #Node > 1
}

pred OutOfOrder  {
   ! ReadInOrder
   #Msg = 3
}



run NumOfState for 3
run OutOfOrder for 4

fun FROM: Msg -> Node {{m: Msg, n: Node | n in m.state.from}}
fun TO: Msg -> Node {{m: Msg, n: Node | n in m.state.to}}
