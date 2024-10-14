import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Image, Modal, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const currencies = {
  KES: { name: 'Kenyan Shilling', symbol: 'KSh' },
  UGX: { name: 'Ugandan Shilling', symbol: 'USh' },
  TZS: { name: 'Tanzanian Shilling', symbol: 'TSh' },
  ETB: { name: 'Ethiopian Birr', symbol: 'Br' },
};

const languages = {
  en: {
    appName: 'VeloPesa',
    availableBalance: 'Available Balance',
    greeting: {
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
    },
    tagline: 'Swift and Secure Escrow for your Mobile Payments',
    quickActions: {
      pay: 'Pay',
      request: 'Request',
      escrow: 'Escrow',
    },
    insights: {
      title: 'Quick Insights',
      spending: 'Spending',
    },
    activeEscrows: {
      title: 'Active Escrows',
      freelanceWork: 'Web App Freelance Work for Alfred & Co.',
      awaitingDelivery: 'Awaiting delivery',
      productPurchase: 'Safari Boots Purchase from Instagram Vendor Kirui',
      readyForRelease: 'Ready for release',
    },
    paymentOptions: {
      title: 'Payment Options',
    },
    transactionHistory: {
      title: 'Transaction History',
      groceries: 'Groceries',
      coffeeShop: 'Coffee Shop',
      freelancePay: 'Freelance Pay',
    },
    navigation: {
      home: 'Home',
      send: 'Send',
      explore: 'Explore',
      insights: 'Insights',
      contacts: 'Contacts',
    },
    escrowProcess: {
      startTransaction: 'Start Escrow Transaction',
      title: 'New Escrow Transaction',
      amount: 'Amount',
      description: 'Description',
      recipient: 'Recipient',
      submit: 'Submit',
      cancel: 'Cancel',
      withdraw: 'Withdraw',
    },
  },
  sw: {
    // Swahili translations (same structure as English)
  },
};

// ... (keep all the styled components as they were)

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f8f9fa;
`;

const HeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const AppName = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #4e54c8;
`;

const HeaderIcons = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const HeaderIcon = styled(Icon)`
  font-size: 24px;
  margin-left: 16px;
`;

const LanguageToggle = styled(TouchableOpacity)`
  padding: 8px;
  margin-left: 16px;
  background-color: #4e54c8;
  border-radius: 4px;
`;

const LanguageText = styled(Text)`
  font-size: 14px;
  color: #ffffff;
`;

const Greeting = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin: 16px 16px 8px 16px;
`;

const Tagline = styled(Text)`
  font-size: 16px;
  color: #666;
  margin: 0 16px 16px 16px;
`;

const BalanceCard = styled(LinearGradient)`
  margin: 16px;
  border-radius: 12px;
  padding: 16px;
`;

const BalanceText = styled(Text)`
  font-size: 16px;
  color: #fff;
`;

const BalanceAmount = styled(Text)`
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  margin-top: 8px;
`;

const QuickActionsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  margin: 16px 0;
`;

const ActionButton = styled(TouchableOpacity)`
  align-items: center;
`;

const ActionText = styled(Text)`
  font-size: 14px;
  margin-top: 8px;
  color: #4e54c8;
`;

const SectionTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin: 24px 16px 16px 16px;
`;

const Card = styled(View)`
  background-color: #fff;
  margin: 0 16px 16px 16px;
  border-radius: 12px;
  padding: 16px;
  elevation: 2;
`;

const InsightRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
`;

const InsightText = styled(Text)`
  font-size: 16px;
`;

const InsightValue = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${({ color }) => color || '#333'};
`;

const EscrowItem = styled(View)`
  margin-bottom: 12px;
`;

const EscrowTitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

const EscrowStatus = styled(Text)`
  color: #666;
  margin-top: 4px;
`;

const PaymentOption = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
`;

const PaymentOptionImage = styled(Image)`
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;

const PaymentOptionText = styled(Text)`
  font-size: 16px;
`;

const TransactionItem = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

const TransactionInfo = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const TransactionIcon = styled(Icon)`
  font-size: 24px;
  color: #4e54c8;
  margin-right: 12px;
`;

const TransactionText = styled(Text)`
  font-size: 16px;
`;

const TransactionAmount = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${({ type }) => (type === 'credit' ? '#28a745' : '#dc3545')};
`;

const BottomNavigation = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  padding: 12px 0;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #f0f2f5;
`;

const NavButton = styled(TouchableOpacity)`
  align-items: center;
`;

const NavText = styled(Text)`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const EscrowServiceCard = styled(TouchableOpacity)`
  background-color: #fff;
  margin: 0 16px 16px 16px;
  border-radius: 12px;
  padding: 16px;
  elevation: 2;
  flex-direction: row;
  align-items: center;
`;

const EscrowServiceText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-left: 16px;
`;

const EscrowProcessModal = styled(Modal)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const EscrowProcessContent = styled(View)`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
`;

const EscrowStep = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`;

const EscrowStepText = styled(Text)`
  font-size: 16px;
  margin-left: 10px;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const EscrowForm = styled(View)`
  padding: 16px;
`;

const Input = styled(TextInput)`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
`;

const Button = styled(TouchableOpacity)`
  background-color: ${props => props.color || '#4e54c8'};
  padding: 12px;
  border-radius: 4px;
  align-items: center;
  margin-bottom: 8px;
`;

const ButtonText = styled(Text)`
  color: #fff;
  font-weight: bold;
`;

const App = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentCurrency, setCurrentCurrency] = useState('KES');
  const [greeting, setGreeting] = useState('');
  const [showEscrowProcess, setShowEscrowProcess] = useState(false);
  const [escrowAmount, setEscrowAmount] = useState('');
  const [escrowDescription, setEscrowDescription] = useState('');
  const [escrowRecipient, setEscrowRecipient] = useState('');

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'sw' : 'en');
  };

  const toggleCurrency = () => {
    const currencyKeys = Object.keys(currencies);
    const currentIndex = currencyKeys.indexOf(currentCurrency);
    const nextIndex = (currentIndex + 1) % currencyKeys.length;
    setCurrentCurrency(currencyKeys[nextIndex]);
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting(languages[currentLanguage].greeting.morning);
    } else if (hour < 18) {
      setGreeting(languages[currentLanguage].greeting.afternoon);
    } else {
      setGreeting(languages[currentLanguage].greeting.evening);
    }
  }, [currentLanguage]);

  const t = languages[currentLanguage];

  const handleEscrowSubmit = () => {
    // Here you would typically send the escrow data to your backend
    console.log('Escrow submitted:', { amount: escrowAmount, description: escrowDescription, recipient: escrowRecipient });
    setShowEscrowProcess(false);
    // Reset form
    setEscrowAmount('');
    setEscrowDescription('');
    setEscrowRecipient('');
  };

  const handleEscrowCancel = () => {
    setShowEscrowProcess(false);
    // Reset form
    setEscrowAmount('');
    setEscrowDescription('');
    setEscrowRecipient('');
  };

  const handleEscrowWithdraw = () => {
    // Implement withdrawal logic here
    console.log('Escrow withdrawn');
    setShowEscrowProcess(false);
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <HeaderContainer>
          <AppName>{t.appName}</AppName>
          <HeaderIcons>
            <HeaderIcon name="notifications-outline" />
            <HeaderIcon name="person-circle-outline" />
            <LanguageToggle onPress={toggleLanguage}>
              <LanguageText>{currentLanguage.toUpperCase()}</LanguageText>
            </LanguageToggle>
            <LanguageToggle onPress={toggleCurrency}>
              <LanguageText>{currentCurrency}</LanguageText>
            </LanguageToggle>
          </HeaderIcons>
        </HeaderContainer>

        <Greeting>{greeting}, John</Greeting>
        <Tagline>{t.tagline}</Tagline>

        <BalanceCard colors={['#4e54c8', '#8f94fb']}>
          <BalanceText>{t.availableBalance}</BalanceText>
          <BalanceAmount>{currencies[currentCurrency].symbol} 485,000.00</BalanceAmount>
        </BalanceCard>

        <QuickActionsContainer>
          <ActionButton>
            <Icon name="wallet-outline" size={32} color="#4e54c8" />
            <ActionText>{t.quickActions.pay}</ActionText>
          </ActionButton>
          <ActionButton>
            <Icon name="cash-outline" size={32} color="#4e54c8" />
            <ActionText>{t.quickActions.request}</ActionText>
          </ActionButton>
          <ActionButton onPress={() => setShowEscrowProcess(true)}>
            <Icon name="lock-closed-outline" size={32} color="#4e54c8" />
            <ActionText>{t.quickActions.escrow}</ActionText>
          </ActionButton>
        </QuickActionsContainer>

        <SectionTitle>{t.insights.title}</SectionTitle>
        <Card>
          <InsightRow>
            <InsightText>{t.insights.spending}</InsightText>
            <InsightValue color="#dc3545">- {currencies[currentCurrency].symbol} 65,000.00</InsightValue>
          </InsightRow>
        </Card>

        <SectionTitle>{t.activeEscrows.title}</SectionTitle>
        <Card>
          <EscrowItem>
            <EscrowTitle>{t.activeEscrows.freelanceWork}</EscrowTitle>
            <EscrowStatus>{t.activeEscrows.awaitingDelivery}</EscrowStatus>
          </EscrowItem>
          <EscrowItem>
            <EscrowTitle>{t.activeEscrows.productPurchase}</EscrowTitle>
            <EscrowStatus>{t.activeEscrows.readyForRelease}</EscrowStatus>
          </EscrowItem>
        </Card>

        <SectionTitle>{t.paymentOptions.title}</SectionTitle>
        <Card>
          <PaymentOption>
            <PaymentOptionImage source={{ uri: 'https://png.co.ke/image/mpesa-logo-png-m-pesa-logo-png/' }} />
            <PaymentOptionText>M-PESA</PaymentOptionText>
          </PaymentOption>
          <PaymentOption>
            <PaymentOptionImage source={{ uri: 'https://png.co.ke/image/airtel-logo/' }} />
            <PaymentOptionText>Airtel Money</PaymentOptionText>
          </PaymentOption>
          <PaymentOption>
            <PaymentOptionImage source={{ uri: 'https://example.com/mtn-mobile-money-logo.png' }} />
            <PaymentOptionText>MTN Mobile Money</PaymentOptionText>
          </PaymentOption>
          <PaymentOption>
            <PaymentOptionImage source={{ uri: 'https://example.com/tigopesa-logo.png' }} />
            <PaymentOptionText>TigoPesa</PaymentOptionText>
          </PaymentOption>
          <PaymentOption>
            <PaymentOptionImage source={{ uri: 'https://example.com/orange-money-logo.png' }} />
            <PaymentOptionText>Orange Money</PaymentOptionText>
          </PaymentOption>
        </Card>

        <SectionTitle>{t.transactionHistory.title}</SectionTitle>
        <Card>
          <TransactionItem>
            <TransactionInfo>
              <TransactionIcon name="basket-outline" />
              <TransactionText>{t.transactionHistory.groceries}</TransactionText>
            </TransactionInfo>
            <TransactionAmount type="debit">- {currencies[currentCurrency].symbol} 7,500.00</TransactionAmount>
          </TransactionItem>
          <TransactionItem>
            <TransactionInfo>
              <TransactionIcon name="cafe-outline" />
              <TransactionText>{t.transactionHistory.coffeeShop}</TransactionText>
            </TransactionInfo>
            <TransactionAmount type="debit">- {currencies[currentCurrency].symbol} 450.00</TransactionAmount>
          </TransactionItem>
          <TransactionItem>
            <TransactionInfo>
              <TransactionIcon name="briefcase-outline" />
              <TransactionText>{t.transactionHistory.freelancePay}</TransactionText>
            </TransactionInfo>
            <TransactionAmount type="credit">{currencies[currentCurrency].symbol} 50,000.00</TransactionAmount>
          </TransactionItem>
        </Card>
      </ScrollView>

      <EscrowProcessModal
        visible={showEscrowProcess}
        transparent={true}
        animationType="fade"
      >
        <EscrowProcessContent>
          <CloseButton onPress={() => setShowEscrowProcess(false)}>
            <Icon name="close-outline" size={24} color="#4e54c8" />
          </CloseButton>
          <SectionTitle>{t.escrowProcess.title}</SectionTitle>
          <EscrowForm>
            <Input 
              placeholder={t.escrowProcess.amount}
              value={escrowAmount}
              onChangeText={setEscrowAmount}
              keyboardType="numeric"
            />
            <Input 
              placeholder={t.escrowProcess.description}
              value={escrowDescription}
              onChangeText={setEscrowDescription}
            />
            <Input 
              placeholder={t.escrowProcess.recipient}
              value={escrowRecipient}
              onChangeText={setEscrowRecipient}
            />
            <Button onPress={handleEscrowSubmit}>
              <ButtonText>{t.escrowProcess.submit}</ButtonText>
            </Button>
            <Button onPress={handleEscrowCancel} color="#dc3545">
              <ButtonText>{t.escrowProcess.cancel}</ButtonText>
            </Button>
            <Button onPress={handleEscrowWithdraw} color="#ffc107">
              <ButtonText>{t.escrowProcess.withdraw}</ButtonText>
            </Button>
          </EscrowForm>
        </EscrowProcessContent>
      </EscrowProcessModal>

      <BottomNavigation>
        <NavButton>
          <Icon name="home-outline" size={24} color="#4e54c8" />
          <NavText>{t.navigation.home}</NavText>
        </NavButton>
        <NavButton>
          <Icon name="send-outline" size={24} color="#4e54c8" />
          <NavText>{t.navigation.send}</NavText>
        </NavButton>
        <NavButton>
          <Icon name="compass-outline" size={24} color="#4e54c8" />
          <NavText>{t.navigation.explore}</NavText>
        </NavButton>
        <NavButton>
          <Icon name="pie-chart-outline" size={24} color="#4e54c8" />
          <NavText>{t.navigation.insights}</NavText>
        </NavButton>
        <NavButton>
          <Icon name="people-outline" size={24} color="#4e54c8" />
          <NavText>{t.navigation.contacts}</NavText>
        </NavButton>
      </BottomNavigation>
    </Container>
  );
};

export default App;