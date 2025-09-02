@@ .. @@
       if (error) {
        if (error.message.includes('User already registered')) {
          toast.error('An account with this email already exists. Please try logging in instead.');
        } else if (error.message.includes('Password should be at least')) {
          toast.error('Password must be at least 6 characters long.');
        } else {
          toast.error('Registration failed: ' + error.message);
        }
      } else {
        if (data.user?.email_confirmed_at) {
          toast.success('Account created successfully! Redirecting to dashboard...');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1000);
        } else {
          toast.success('Account created! Please check your email to confirm your account.');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Registration Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Account Creation</h4>
                <p className="text-sm text-green-800">
                  Create your account to access the full school management system. 
                  Choose your role carefully as it determines your access level.
                </p>
              </div>

              <div className="space-y-2">