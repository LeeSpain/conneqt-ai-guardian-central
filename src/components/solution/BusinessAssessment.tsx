import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, TrendingUp, Brain, Target } from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; score: number }[];
}

interface AssessmentResult {
  overallScore: number;
  recommendations: string[];
  suggestedTier: string;
  riskFactors: string[];
  strengths: string[];
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'volume',
    question: 'What is your current monthly call volume?',
    options: [
      { value: 'low', label: 'Under 1,000 calls', score: 1 },
      { value: 'medium', label: '1,000 - 10,000 calls', score: 2 },
      { value: 'high', label: '10,000 - 50,000 calls', score: 3 },
      { value: 'enterprise', label: 'Over 50,000 calls', score: 4 }
    ]
  },
  {
    id: 'complexity',
    question: 'How complex are your typical customer inquiries?',
    options: [
      { value: 'simple', label: 'Simple FAQ and basic info', score: 1 },
      { value: 'moderate', label: 'Some problem-solving required', score: 2 },
      { value: 'complex', label: 'Technical troubleshooting', score: 3 },
      { value: 'expert', label: 'Expert consultation needed', score: 4 }
    ]
  },
  {
    id: 'hours',
    question: 'What hours do you need support coverage?',
    options: [
      { value: 'business', label: 'Business hours only', score: 1 },
      { value: 'extended', label: 'Extended hours (12+ hours)', score: 2 },
      { value: 'twenty-four', label: '24/7 coverage needed', score: 3 },
      { value: 'global', label: 'Global timezone support', score: 4 }
    ]
  },
  {
    id: 'integrations',
    question: 'How many systems need integration?',
    options: [
      { value: 'minimal', label: '1-2 systems (CRM, email)', score: 1 },
      { value: 'moderate', label: '3-5 systems', score: 2 },
      { value: 'extensive', label: '6-10 systems', score: 3 },
      { value: 'enterprise', label: '10+ complex systems', score: 4 }
    ]
  },
  {
    id: 'compliance',
    question: 'What compliance requirements do you have?',
    options: [
      { value: 'none', label: 'No specific requirements', score: 1 },
      { value: 'basic', label: 'GDPR compliance', score: 2 },
      { value: 'industry', label: 'Industry standards (HIPAA, PCI)', score: 3 },
      { value: 'strict', label: 'Strict regulatory compliance', score: 4 }
    ]
  }
];

const BusinessAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    let totalScore = 0;
    const recommendations: string[] = [];
    const riskFactors: string[] = [];
    const strengths: string[] = [];

    // Calculate total score
    assessmentQuestions.forEach(question => {
      const answer = finalAnswers[question.id];
      const option = question.options.find(opt => opt.value === answer);
      if (option) {
        totalScore += option.score;
      }
    });

    // Generate recommendations based on answers
    if (finalAnswers.volume === 'enterprise' || finalAnswers.complexity === 'expert') {
      recommendations.push('Consider our Enterprise tier for dedicated support');
    }
    
    if (finalAnswers.hours === 'twenty-four' || finalAnswers.hours === 'global') {
      recommendations.push('24/7 AI coverage recommended to reduce costs');
      strengths.push('Good candidate for AI automation');
    }

    if (finalAnswers.integrations === 'extensive' || finalAnswers.integrations === 'enterprise') {
      recommendations.push('Professional services team for complex integrations');
      riskFactors.push('Complex integration timeline (4-6 weeks)');
    }

    if (finalAnswers.compliance === 'industry' || finalAnswers.compliance === 'strict') {
      recommendations.push('Enterprise security and compliance package required');
      riskFactors.push('Additional compliance validation needed');
    }

    // Suggest service tier
    let suggestedTier = 'ai-plus';
    if (totalScore >= 16) {
      suggestedTier = 'enterprise';
    } else if (totalScore >= 12) {
      suggestedTier = 'business';
    } else if (totalScore >= 8) {
      suggestedTier = 'ai-plus';
    } else {
      suggestedTier = 'ai-first';
    }

    const assessmentResult: AssessmentResult = {
      overallScore: totalScore,
      recommendations,
      suggestedTier,
      riskFactors,
      strengths
    };

    setResult(assessmentResult);
    setIsComplete(true);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
    setResult(null);
  };

  const getTierName = (tier: string) => {
    const tiers = {
      'ai-first': 'AI-First',
      'ai-plus': 'AI-Plus',
      'business': 'Business',
      'enterprise': 'Enterprise'
    };
    return tiers[tier as keyof typeof tiers] || tier;
  };

  if (isComplete && result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="text-primary" size={24} />
            Your Business Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
              <TrendingUp className="text-primary" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Assessment Complete</h3>
            <p className="text-muted-foreground">
              Based on your responses, we've analyzed your customer service needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="text-primary" size={16} />
                  Recommended Service Tier
                </h4>
                <div className="text-center">
                  <Badge className="text-lg px-4 py-2">
                    {getTierName(result.suggestedTier)}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    Best fit for your requirements
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Complexity Score</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Assessment Score</span>
                    <span>{result.overallScore}/20</span>
                  </div>
                  <Progress value={(result.overallScore / 20) * 100} />
                </div>
              </CardContent>
            </Card>
          </div>

          {result.recommendations.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={16} />
                Key Recommendations
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.strengths.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="text-blue-600" size={16} />
                Your Strengths
              </h4>
              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <TrendingUp className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.riskFactors.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="text-orange-600" size={16} />
                Considerations
              </h4>
              <ul className="space-y-2">
                {result.riskFactors.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2">
            <Button className="flex-1">
              Configure {getTierName(result.suggestedTier)} Solution
            </Button>
            <Button variant="outline" onClick={resetAssessment}>
              Retake Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="text-primary" size={24} />
          Business Needs Assessment
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {assessmentQuestions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / assessmentQuestions.length) * 100)}% Complete</span>
          </div>
          <Progress value={((currentQuestion + 1) / assessmentQuestions.length) * 100} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {assessmentQuestions[currentQuestion].question}
          </h3>
          <div className="space-y-3">
            {assessmentQuestions[currentQuestion].options.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className="w-full text-left h-auto p-4 justify-start"
                onClick={() => handleAnswer(assessmentQuestions[currentQuestion].id, option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {currentQuestion > 0 && (
          <Button 
            variant="ghost" 
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            Previous Question
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessAssessment;