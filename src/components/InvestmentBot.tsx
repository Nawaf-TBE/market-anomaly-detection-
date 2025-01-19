import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { StrategyRecommendation } from "@/services/investmentStrategy";

interface Message {
  role: 'bot' | 'user';
  content: string;
}

interface InvestmentBotProps {
  recommendation: StrategyRecommendation;
}

export const InvestmentBot = ({ recommendation }: InvestmentBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const generateBotResponse = (userMessage: string) => {
    let response = '';
    
    if (userMessage.toLowerCase().includes('explain')) {
      response = `Based on our analysis, we're recommending a ${recommendation.action} strategy with ${(recommendation.confidence * 100).toFixed(1)}% confidence. This is because ${recommendation.reasoning}. The risk level is ${recommendation.riskLevel}, with an expected return of ${recommendation.expectedReturn.toFixed(1)}%.`;
    } else if (userMessage.toLowerCase().includes('risk')) {
      response = `The current risk level is ${recommendation.riskLevel}. This means you should ${
        recommendation.riskLevel === 'HIGH' 
          ? 'be very cautious and consider limiting your exposure' 
          : recommendation.riskLevel === 'MEDIUM'
          ? 'maintain balanced positions and monitor the market closely'
          : 'consider this a favorable time for strategic investments'
      }.`;
    } else if (userMessage.toLowerCase().includes('return')) {
      response = `The expected return for this strategy is ${recommendation.expectedReturn.toFixed(1)}%. This projection is based on our market analysis and historical patterns.`;
    } else {
      response = "I can help explain our investment strategy, discuss risk levels, or provide details about expected returns. What would you like to know?";
    }

    return response;
  };

  const handleUserMessage = (message: string) => {
    const userMessage: Message = { role: 'user', content: message };
    const botMessage: Message = { role: 'bot', content: generateBotResponse(message) };
    
    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const predefinedQuestions = [
    "Can you explain the current strategy?",
    "What's the risk level?",
    "Tell me about expected returns"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          Ask Investment Bot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Investment Bot</DialogTitle>
          <DialogDescription>
            Ask questions about the current investment strategy
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {messages.length === 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Select a question or type your own:
              </p>
              {predefinedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => handleUserMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              setMessages([]);
              setIsOpen(false);
            }}
          >
            Reset Chat
          </Button>
          <Button
            variant="default"
            onClick={() => handleUserMessage("Can you explain the current strategy?")}
          >
            Get Strategy Overview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};