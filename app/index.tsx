import { Text, View, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-surface">
      <View className="px-6 py-12 gap-8">
        
        {/* Navigation Section */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-border gap-2">
          <Text className="text-h3 font-poppins-semibold text-text-primary">App Screens</Text>
          <Link href="/onboarding" asChild>
            <Pressable className="bg-lingua-purple py-3 rounded-xl active:opacity-80">
              <Text className="text-white font-poppins-medium text-center">View Onboarding Screen</Text>
            </Pressable>
          </Link>
        </View>

        
        {/* Typography Section */}
        <View className="gap-4">
          <Text className="text-h1 font-poppins-bold text-text-primary">Typography</Text>
          <View className="gap-2">
            <Text className="text-h1 font-poppins-bold text-text-primary">H1 - Page Title</Text>
            <Text className="text-h2 font-poppins-semibold text-text-primary">H2 - Section Title</Text>
            <Text className="text-h3 font-poppins-semibold text-text-primary">H3 - Card Title</Text>
            <Text className="text-h4 font-poppins-medium text-text-primary">H4 - Subheading</Text>
            <Text className="text-body-lg font-poppins text-text-primary">Body Large - Important content</Text>
            <Text className="text-body-md font-poppins text-text-primary">Body Medium - Body text</Text>
            <Text className="text-body-sm font-poppins text-text-secondary">Body Small - Supporting text</Text>
            <Text className="text-caption font-poppins text-text-secondary">Caption - Labels, meta text</Text>
          </View>
        </View>

        {/* Colors Section */}
        <View className="gap-4">
          <Text className="text-h2 font-poppins-semibold text-text-primary">Colors</Text>
          
          <Text className="text-h4 font-poppins-medium text-text-primary mt-2">Primary</Text>
          <View className="flex-row flex-wrap gap-4">
            <ColorSwatch bgClass="bg-lingua-purple" name="Purple" />
            <ColorSwatch bgClass="bg-lingua-deep-purple" name="Deep Purple" />
            <ColorSwatch bgClass="bg-lingua-blue" name="Blue" />
            <ColorSwatch bgClass="bg-lingua-green" name="Green" />
          </View>

          <Text className="text-h4 font-poppins-medium text-text-primary mt-2">Semantic</Text>
          <View className="flex-row flex-wrap gap-4">
            <ColorSwatch bgClass="bg-success" name="Success" />
            <ColorSwatch bgClass="bg-warning" name="Warning" />
            <ColorSwatch bgClass="bg-streak" name="Streak" />
            <ColorSwatch bgClass="bg-error" name="Error" />
            <ColorSwatch bgClass="bg-info" name="Info" />
          </View>

          <Text className="text-h4 font-poppins-medium text-text-primary mt-2">Neutrals</Text>
          <View className="flex-row flex-wrap gap-4">
            <ColorSwatch bgClass="bg-text-primary" name="Text Primary" />
            <ColorSwatch bgClass="bg-text-secondary" name="Text Secondary" />
            <ColorSwatch bgClass="bg-border" name="Border" />
            <ColorSwatch bgClass="bg-surface" name="Surface" />
            <ColorSwatch bgClass="bg-background" name="Background" border />
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

function ColorSwatch({ bgClass, name, border }: { bgClass: string, name: string, border?: boolean }) {
  return (
    <View className="items-center gap-2">
      <View className={`w-16 h-16 rounded-xl ${bgClass} ${border ? 'border border-border' : ''}`} />
      <Text className="text-caption font-poppins text-text-secondary">{name}</Text>
    </View>
  );
}
